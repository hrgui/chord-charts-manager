import * as React from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import MuiTable from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from "styled-components/macro";
import classnames from "classnames";
import TextField from "@material-ui/core/TextField";
import {
  LinearProgress,
  InputAdornment,
  fade,
  Theme,
  TablePagination,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Alert } from "@material-ui/lab";

function DefaultColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    <TextField
      fullWidth
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FilterListIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export interface TableProps {
  isLoading?: boolean;
  error?;
  columns?;
  data?;
  className?;
  isPageTable?;
  emptyHeader?;
  emptyAction?;
  initialState?;
}

function UnstyledTable({
  isLoading = false,
  error = null,
  columns,
  data,
  className,
  isPageTable = false,
  emptyHeader = "There's nothing here.",
  emptyAction = "Create a new thing and it will show up here.",
  errorText = "An error occurred",
  initialState,
}) {
  const filterTypes = React.useMemo(
    () => ({
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data: data || [],
      filterTypes,
      defaultColumn,
      initialState: { pageSize: 25, ...initialState },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const handleChangePage = (_, page) => gotoPage(page);
  const handleChangeRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    gotoPage(0);
  };

  if (error) {
    console.error(error);
  }

  // Render the UI for your table
  return (
    <>
      <TableContainer className={className}>
        <MuiTable
          size={"small"}
          classes={{
            stickyHeader: classnames({ pageTableStickyHeader: isPageTable }),
          }}
          stickyHeader={isPageTable}
          {...getTableProps()}
        >
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    className="tableHeaderCell"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <div className="sortableHeaderContainer">
                      <div>{column.render("Header")}</div>
                      {column.canSort && (
                        <div className={"sortingSwitch"}>
                          <div
                            className={classnames("sortingTicker", {
                              sortingTickerActive:
                                column.isSortedDesc === false,
                              sortingTickerInactive: column.isSortedDesc,
                            })}
                          >
                            <ArrowDropUpIcon fontSize="small" />
                          </div>
                          <div
                            className={classnames("sortingTicker", {
                              sortingTickerActive: column.isSortedDesc === true,
                              sortingTickerInactive:
                                column.isSortedDesc === false,
                            })}
                          >
                            <ArrowDropDownIcon fontSize="small" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map(
              (row) =>
                prepareRow(row) || (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <TableCell size="small" {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                )
            )}
            {!isLoading && rows.length === 0 && !error && (
              <TableRow>
                <TableCell colSpan={columns?.length}>
                  <div className={"emptyMessage"}>
                    <h1 className="emptyHeader">{emptyHeader}</h1>
                    <h2 className="emptyAction">{emptyAction}</h2>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={columns?.length}>
                  <LinearProgress color="secondary" />
                </TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow>
                <TableCell colSpan={columns?.length}>
                  <div className="emptyMessage">
                    <Alert variant="filled" severity="error">
                      {errorText}
                    </Alert>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}

const UnmemoTable: React.FunctionComponent<TableProps> = styled(UnstyledTable)`
  max-height: calc(100vh - 100px);

  & td {
    white-space: nowrap;
  }
  .emptyMessage {
    text-align: center;
  }

  .emptyHeader {
    font-size: 3em;
  }

  .emptyAction {
    font-weight: normal;
  }

  .sortableHeaderContainer {
    display: flex;
    line-height: 26px;
  }

  .sortingTicker {
    margin-left: ${({ theme }: { theme: Theme }) => theme.spacing(1)}px;
    height: 6px;
    color: ${({ theme }: { theme: Theme }) =>
      fade(theme.palette.text.primary, 0.5)};
  }

  .sortingTickerInactive {
    color: transparent;
  }
`;

export const Table = UnmemoTable;
