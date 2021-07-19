import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";

import { useTable, usePagination, useFilters } from "react-table";

interface TableProps {
  columns: any;
  data: any[];
}

const TransactionTable: React.FC<TableProps> = ({ columns, data }) => {
  const [paginationItems, setPaginationItems] = useState<any[]>([]);

  const tableInstance: any = useTable<any>(
    {
      columns,
      data,
    },
    useFilters,
    usePagination
  );

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    // rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    pageOptions,
    page,
    pageCount,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = tableInstance;

  const pageSizeOptions = [10, 20, 50];

  useEffect(() => {
    if (pageCount <= 7) {
      setPaginationItems(
        Array.from({ length: pageCount }).map((_, i) => i + 1)
      );
    } else if (pageIndex < 5) {
      // #1 active page < 5 -> show first 5
      setPaginationItems([1, 2, 3, 4, 5, "...", pageCount]);
    } else if (pageIndex >= 5 && pageIndex < pageCount - 3) {
      // #2 active page >= 5 && < pageCount - 3
      setPaginationItems([
        1,
        "...",
        pageIndex - 1,
        pageIndex,
        pageIndex + 1,
        "...",
        pageCount,
      ]);
    } else {
      // #3 active page >= pageCount - 3 -> show last
      setPaginationItems([
        1,
        "...",
        pageCount - 4,
        pageCount - 3,
        pageCount - 2,
        pageCount - 1,
        pageCount,
      ]);
    }
  }, [pageIndex, pageSize, pageCount]);

  return (
    <>
      {/* {headerGroups[0].headers[2].render("Filter")} */}
      <table
        {...getTableProps()}
        className="table-fixed divide-y divide-gray-200 w-full"
      >
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any, index: any) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  <div className="flex items-center">
                    {column.render("Header")}
                    {column.Header === "From" ? column.render("Filter") : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-gray-100"
        >
          {page.map((row: any, i: any) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 text-sm text-gray-500 truncate"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              className="border py-2 px-4"
            >
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <nav
            className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 disabled:text-gray-300 rounded-l-md not-disabled:hover:bg-gray-50 focus:outline-none disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </button>
            {paginationItems.map((p, i) => (
              <div key={p.toString() + i}>
                {p === "..." ? (
                  <EmptyPageButton />
                ) : (
                  <PageButton
                    page={p}
                    isActive={p - 1 === pageIndex}
                    onClick={() => gotoPage(p - 1)}
                  />
                )}
              </div>
            ))}
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 disabled:text-gray-300 rounded-r-md not-disabled:hover:bg-gray-50 disabled:cursor-not-allowed focus:outline-none"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export const PageButton: React.FC<any> = function PageButton({
  page,
  isActive,
  onClick,
}) {
  if (isActive) {
    return (
      <button
        aria-current="page"
        className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-500 bg-indigo-50 focus:outline-none"
        onClick={onClick}
      >
        {page}
      </button>
    );
  }
  return (
    <button
      className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none"
      onClick={onClick}
    >
      {page}
    </button>
  );
};

export const EmptyPageButton = () => (
  <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
    ...
  </span>
);

export default TransactionTable;
