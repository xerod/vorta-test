import React from "react";
import { ArrowRightIcon, ExternalLinkIcon } from "@heroicons/react/solid";
import { TransactionResult } from "types/transaction";
import useSWR from "swr";
import fetch from "../../shared/helpers/fetch";
import Spinner from "components/elements/Spinner";

export { TransactionTable };

function TransactionTable({ walletId, page }: { walletId: string; page: any }) {
  const { data, error, isValidating } = useSWR<TransactionResult[]>(
    `http://localhost:4000/transactions/${walletId}?page=${page}`,
    fetch,
    { shouldRetryOnError: false }
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center space-y-2 bg-gray-50 min-h-40">
        <p className="text-4xl font-light text-gray-600">No data found :(</p>
        <a
          href="/transaction"
          className="text-sm text-gray-500 hover:underline"
        >
          Click here to find another transaction
        </a>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center space-y-2 bg-gray-50 min-h-40">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Block
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Hash
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              From
            </th>
            <th scope="col" className="relative py-3">
              <span className="sr-only">Arrow right</span>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              To
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Value
            </th>
            {/* <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Details</span>
            </th> */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data?.map((item: any) => (
            <tr key={item.hash}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                {item.blockNumber}
              </td>
              <td className="flex items-center px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {item.hash.slice(0, 20) + "..."}{" "}
                <a
                  href={`https://etherscan.io/tx/${item.hash}`}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ExternalLinkIcon className="w-4 h-4 ml-2" />
                </a>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                <a
                  href={`/transaction/${item.from}`}
                  className="text-blue-500 hover:underline"
                >
                  {item.from.slice(0, 20) + "..."}
                </a>
              </td>
              <td className="text-sm text-gray-500 whitespace-nowrap">
                <ArrowRightIcon className="w-4 h-4" />
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                <a
                  href={`/transaction/${item.to}`}
                  className="text-blue-500 hover:underline"
                >
                  {item.to.slice(0, 20) + "..."}
                </a>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {(parseFloat(item.value) / 10 ** 18).toFixed(4)} ETH
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
