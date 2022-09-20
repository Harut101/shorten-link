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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [tableData, setTableData] = useState({});
  const [pagination, setPagination] = useState({});
  const isAuth = useAuth();

  useEffect(() => {
    if (isAuth === false) {
      navigate("/sign-in");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    user.loggedIn && get();

    return () => {
      getBitlinks.cancel();
    };
  }, [user.loggedIn]);

  async function get(page = 1, size = 5) {
    let { data } = await getBitlinks.call(user.default_group_guid, page, size);
    dispatch(addLinks(data?.links));
    setTableData(tableDataResolver(data?.links));
    setPagination(data?.pagination);
  }

  function onPageChange(page) {
    get(page);
  }

  return (
    <Box>
      <Box sx={{ width: "100%", mb: "40px" }}>lINKS</Box>
      <Box sx={{ width: "100%" }}>
        <DataTable
          rows={tableData.rows}
          columns={tableData.columns}
          page={pagination.page}
          total={pagination.total}
          perPage={5}
          onPageChange={onPageChange}
        />
      </Box>
    </Box>
  );
}

export default LinkEditor;
