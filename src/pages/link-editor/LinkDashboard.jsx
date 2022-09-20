import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getLinks } from "../../api/bitlyApi";
import { addLinks } from "../../store/reducers/linksReducers";
import DataTable from "../../components/dataTable/DataTable";
import tableDataResolver from "../../services/tableDataResolver";
import useDashboardStyles from "./link-dashboard-styles";

const getBitlinks = getLinks();

function LinkDashboard() {
  const { dashboard, dashboardHeader, dashboardTitle } = useDashboardStyles();
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

  const get = useCallback(
    async (page = 1, size = 5) => {
      let { data } = await getBitlinks.call(
        user.default_group_guid,
        page,
        size
      );
      dispatch(addLinks(data?.links));
      setTableData(tableDataResolver(data?.links));
      setPagination(data?.pagination);
    },
    [user.default_group_guid, dispatch]
  );

  useEffect(() => {
    user.loggedIn && get();

    return () => {
      getBitlinks.cancel();
    };
  }, [user.loggedIn, get]);

  function onPageChange(page) {
    get(page);
  }

  return (
    <Box className={dashboard}>
      <Box className={dashboardHeader}>
        <Typography variant="p" component="p" className={dashboardTitle}>
          Links
        </Typography>
        <Button variant="contained" onClick={() => null}>
          Create new
        </Button>
      </Box>
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

export default LinkDashboard;
