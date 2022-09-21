import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useAuth from "../../hooks/useAuth";
import { getLinks, shortenLink } from "../../api/bitlyApi";
import { addLinks, addLink } from "../../store/reducers/linksReducers";
import DataTable from "../../components/dataTable/DataTable";
import tableDataResolver from "../../services/tableDataResolver";
import useDashboardStyles from "./link-dashboard-styles";
import CreateModal from "./section/createModal/CreateModal";
import debounce from "../../helpers/debounce";
import LinearProgress from "@mui/material/LinearProgress";

const getBitlinks = getLinks();
const shortenBitlinks = shortenLink();

function LinkDashboard() {
  const classes = useDashboardStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const links = useSelector((state) => state.links);
  const [tableData, setTableData] = useState({});
  const [pagination, setPagination] = useState({ page: 1, total: 1 });
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [firstRender, setFirstRender] = useState(true);
  useAuth(false, "/sign-in");

  useEffect(() => {
    if (links.length) {
      setTableData(tableDataResolver(links));
    }
  }, [links]);

  const debouncedGet = useMemo(
    () =>
      debounce(async ({ page, size }) => {
        try {
          let { data } = await getBitlinks.call(
            user.default_group_guid,
            page,
            size
          );
          setFirstRender(false);
          dispatch(addLinks(data?.links));
          setPagination(data?.pagination);
          setLoading(false);
        } catch (e) {
          console.log(e);
          setLoading(false);
          setFirstRender(false);
        }
      }, 500),
    [user.default_group_guid, dispatch]
  );

  const get = useCallback(
    (page = 1, size = 5) => {
      debouncedGet({ page, size });
    },
    [debouncedGet]
  );

  useEffect(() => {
    user.loggedIn && get();

    return () => {
      getBitlinks.cancel();
    };
  }, [user.loggedIn, get]);

  function onPageChange(_, page) {
    setLoading(true);
    get(page + 1);
  }

  const createLink = useCallback(
    async ({ url }) => {
      try {
        setOpenModal(false);
        setLoading(true);
        const { data } = await shortenBitlinks.call(url);
        dispatch(addLink(data));
        setPagination({ ...pagination, total: pagination.total + 1 });
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    },
    [pagination, dispatch]
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

      <Box sx={{ width: "100%", mb: "30px" }}>
        {loading && <LinearProgress />}
      </Box>

      {!loading && links.length === 0 && (
        <Box sx={{ width: "100%", mb: "30px" }}>
          <Typography
            variant="p"
            component="p"
            sx={{ textAlign: "center" }}
            className={classes.title}
          >
            You haven't got a Links yet
          </Typography>
        </Box>
      )}

      {!firstRender && links.length > 0 && (
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
      )}
      {openModal && (
        <CreateModal
          open={openModal}
          onClose={closeModal}
          onCreate={createLink}
        />
      )}
    </Box>
  );
}

export default LinkDashboard;
