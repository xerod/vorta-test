import React, { useState } from "react";

import { TransactionTable } from "components/modules/TransactionTable";
import { Pagination } from "components/elements/Pagination";

export default function Page() {
  const walletId = location.pathname.split("/")[2];

  const [page, setPage] = useState(1);

  return (
    <>
      <p className="text-lg text-gray-400">({walletId})</p>

      <div className="flex flex-col mt-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-x-hidden border border-gray-200 shadow sm:rounded-lg">
              <TransactionTable walletId={walletId} page={page} />
              <div className="hidden">
                <TransactionTable walletId={walletId} page={page + 1} />
              </div>
              <Pagination
                onChange={(selected) => setPage(selected)}
                totalItem={page * 10 + 100}
                itemPerPage={10}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
