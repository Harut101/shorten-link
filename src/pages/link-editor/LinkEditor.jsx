import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getLinks } from "../../api/bitlyApi";
import { addLinks } from "../../store/reducers/linksReducers";
import DataTable from "../../components/dataTable/DataTable";
import tableDataResolver from "../../services/tableDataResolver";

const getBitlinks = getLinks();

function LinkEditor() {
  const user = useSelector((state) => state.user);
  const [tableData, setTableData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useAuth();

  useEffect(() => {
    if (isAuth === false) {
      navigate("/sign-in");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    async function get() {
      let { data } = await getBitlinks.call(user.default_group_guid);
      dispatch(addLinks(data?.links));
      setTableData(tableDataResolver(data?.links));
    }

    user.loggedIn && get();

    return () => {
      getBitlinks.cancel();
    };
  }, [user.loggedIn, user.default_group_guid, dispatch]);

  return (
    <Box>
      <Box sx={{ width: "100%", mb: "40px" }}>lINKS</Box>
      <Box sx={{ width: "100%" }}>
        <DataTable
          rows={tableData.rows}
          columns={tableData.columns}
          pageSize={5}
          perPage={5}
          onPageChange={() => null}
        />
      </Box>
    </Box>
  );
}

export default LinkEditor;
