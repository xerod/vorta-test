import React, { useEffect, useState } from "react";
import fetch from "libs/fetch";
import useSWR from "swr";

import { TransactionDetails, TransactionResult } from "types/transaction";
import { TransactionTable } from "components/modules/TransactionTable";
import { Pagination } from "components/elements/Pagination";
import Spinner from "components/elements/Spinner";

export default function Page() {
  const walletId = location.pathname.replace("/transaction/", "");

  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  //   const [data, setData] = useState<TransactionResult[]>([]);
  const [transactions, setTransactions] = useState<
    TransactionResult[] | undefined
  >([]);

  const { data } = useSWR<TransactionDetails>(
    `https://api.etherscan.io/api?module=account&action=txlist&address=${walletId}&tag=latest&apikey=2HFXBCBRBAE62NYIRZYW1FZS46TYCICPSG`,
    fetch
  );

  useEffect(() => {
    setStart(10 * (page - 1));
    setEnd(page * 10);
    setTransactions(data?.result.slice(start, end));
  }, [data, page, start, end]);

  if (!transactions) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex items-end my-8 space-y-1">
        <p className="mr-2 text-4xl font-bold">Transactions</p>
        <p className="text-lg text-gray-400">({walletId})</p>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 shadow sm:rounded-lg">
              <TransactionTable transactions={transactions} />
              <Pagination
                onChange={(selected) => setPage(selected)}
                totalItem={data ? data.result.length : 0}
                itemPerPage={10}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
