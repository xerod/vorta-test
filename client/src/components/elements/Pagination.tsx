import React, { ReactElement, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

interface Props {
  /**
   * The total number of results
   */
  totalItem: number;
  /**
   * The number of results shown per page
   */
  itemPerPage?: number;
  /**
   * The function executed on page change
   */
  onChange: (activePage: number) => void;
}

export const Pagination = (props: Props): ReactElement => {
  const { totalItem, itemPerPage = 10, onChange } = props;
  const TOTAL_PAGES = Math.ceil(totalItem / itemPerPage);
  const MAX_VISIBLE_PAGES = 7;
  const FIRST_PAGE = 1;
  const LAST_PAGE = TOTAL_PAGES;

  const [pages, setPages] = useState<(number | string)[]>([]);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    onChange(activePage);
  }, [activePage]);

  useEffect(() => {
    if (TOTAL_PAGES <= MAX_VISIBLE_PAGES) {
      setPages(Array.from({ length: TOTAL_PAGES }).map((_, i) => i + 1));
    } else if (activePage < 5) {
      // #1 active page < 5 -> show first 5
      setPages([1, 2, 3, 4, 5, "...", TOTAL_PAGES]);
    } else if (activePage >= 5 && activePage < TOTAL_PAGES - 3) {
      // #2 active page >= 5 && < TOTAL_PAGES - 3
      setPages([
        1,
        "...",
        activePage - 1,
        activePage,
        activePage + 1,
        "...",
        TOTAL_PAGES,
      ]);
    } else {
      // #3 active page >= TOTAL_PAGES - 3 -> show last
      setPages([
        1,
        "...",
        TOTAL_PAGES - 4,
        TOTAL_PAGES - 3,
        TOTAL_PAGES - 2,
        TOTAL_PAGES - 1,
        TOTAL_PAGES,
      ]);
    }
  }, [activePage, TOTAL_PAGES]);

  function handlePreviousClick() {
    setActivePage(activePage - 1);
  }

  function handleNextClick() {
    setActivePage(activePage + 1);
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
      <div className="flex justify-between flex-1 sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {activePage * itemPerPage - itemPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(activePage * itemPerPage, totalItem)}
            </span>{" "}
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              disabled={activePage === FIRST_PAGE}
              onClick={handlePreviousClick}
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 disabled:text-gray-300 rounded-l-md not-disabled:hover:bg-gray-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

            {pages.map((p, i) => (
              <div key={p.toString() + i}>
                {p === "..." ? (
                  <EmptyPageButton />
                ) : (
                  <PageButton
                    page={p}
                    isActive={p === activePage}
                    onClick={() => setActivePage(+p)}
                  />
                )}
              </div>
            ))}

            <button
              disabled={activePage === LAST_PAGE}
              onClick={handleNextClick}
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 disabled:text-gray-300 rounded-r-md not-disabled:hover:bg-gray-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
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
        className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-500 bg-indigo-50"
        onClick={onClick}
      >
        {page}
      </button>
    );
  }
  return (
    <button
      className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
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
