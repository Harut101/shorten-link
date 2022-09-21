import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getLinks, shortenLink } from "../../api/bitlyApi";
import { addLinks, addLink } from "../../store/reducers/linksReducers";
import DataTable from "../../components/dataTable/DataTable";
import tableDataResolver from "../../services/tableDataResolver";
import useDashboardStyles from "./link-dashboard-styles";
import CreateModal from "./section/createModal/CreateModal";

const getBitlinks = getLinks();
const shortenBitlinks = shortenLink();

function LinkDashboard() {
  const classes = useDashboardStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const links = useSelector((state) => state.links);
  const [tableData, setTableData] = useState({});
  const [pagination, setPagination] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const isAuth = useAuth();

  useEffect(() => {
    if (isAuth === false) {
      navigate("/sign-in");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    if (links.length) {
      setTableData(tableDataResolver(links));
    }
  }, [links]);

  const get = useCallback(
    async (page = 1, size = 5) => {
      try {
        let { data } = await getBitlinks.call(
          user.default_group_guid,
          page,
          size
        );
        dispatch(addLinks(data?.links));
        setPagination(data?.pagination);
      } catch (e) {
        console.log(e);
      }
    },
    [user.default_group_guid, dispatch]
  );

  useEffect(() => {
    user.loggedIn && get();

    return () => {
      getBitlinks.cancel();
    };
  }, [user.loggedIn, get]);

  function onPageChange(_, page) {
    get(page + 1);
  }

  const createLink = useCallback(
    async ({ url }) => {
      try {
        const { data } = await shortenBitlinks.call(url);
        dispatch(addLink(data));
        setOpenModal(false);
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch]
  );

  const closeModal = useCallback(() => setOpenModal(false), []);

  return (
    <Box className={classes.dashboard}>
      <Box className={classes.header}>
        <Typography variant="p" component="p" className={classes.title}>
          Links
        </Typography>
        <Button variant="contained" onClick={() => setOpenModal(true)}>
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
      <CreateModal
        open={openModal}
        onClose={closeModal}
        onCreate={createLink}
      />
    </Box>
  );
}

export default LinkDashboard;
