import React, { useEffect, useMemo, useState } from "react";

import TransactionTable from "components/modules/TransactionTable";

import { fromFetch } from "rxjs/fetch";
import { defer, from, mergeMap } from "rxjs";
import { matchSorter } from "match-sorter";

export default function Page() {
  const walletId = location.pathname.split("/")[2];

  const [data, setData] = useState<any[]>([]);

  const makeAnApiCall = (v: any) =>
    defer(() =>
      fromFetch(`http://localhost:4000/transactions/${walletId}?offset=${v}`)
    );

  useEffect(() => {
    const iterator = [100, 1000, 5000, 10000];
    const subscription = from(iterator)
      .pipe(
        mergeMap((val) => makeAnApiCall(val)),
        mergeMap((response) => response.json())
      )
      .subscribe((data) => setData(data));

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function fuzzyTextFilterFn(rows: any, id: any, filterValue: any) {
    return matchSorter(rows, filterValue, {
      keys: [(row: any) => row.values[id]],
    });
  }

  const columns = useMemo(
    () => [
      {
        Header: "Block",
        accessor: "blockNumber",
        disableFilters: true,
      },
      {
        Header: "Hash",
        accessor: "hash",
        disableFilters: true,
      },
      {
        Header: "From",
        accessor: "from",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "To",
        accessor: "to",
        disableFilters: true,
      },
      {
        Header: "Value (ETH)",
        accessor: "value",
        disableFilters: true,
      },
    ],
    []
  );

  if (!data.length) {
    return <p>loading...</p>;
  }

  return (
    <>
      <p className="text-lg text-gray-400">({walletId})</p>

      <div className="flex flex-col mt-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-x-hidden border border-gray-200 shadow sm:rounded-lg">
              {data && <TransactionTable columns={columns} data={data} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: any) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      className="max-w-16 p-1 ml-6 bg-white border rounded-md"
    >
      <option value="">All</option>
      {options.map((option: any, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
