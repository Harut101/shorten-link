import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import useAppStyles from "../../styles/app-styles";

function DataTable({ rows, columns, pageSize, perPage, onPageChange }) {
  const { table } = useAppStyles();
  return (
    <Paper>
      <TableContainer className={table}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} sx={{ fontWeight: "bold" }}>
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.field];
                    return (
                      <TableCell
                        key={column.id}
                        sx={{
                          maxWidth: "100px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}

DataTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  pageSize: PropTypes.number,
  perPage: PropTypes.number,
  onPageChange: PropTypes.func,
};

DataTable.defaultProps = {
  rows: [],
  columns: [],
  pageSize: 5,
  perPage: 5,
  onPageChange: () => {},
};

export default DataTable;
