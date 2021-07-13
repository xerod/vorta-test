import React from "react";
import { ArrowRightIcon } from "@heroicons/react/solid";

export { TransactionTable };

function TransactionTable({ transactions }: { transactions: any }) {
  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
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
              Value (ETH)
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Details</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((item: any) => (
            <tr key={item.hash}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                {item.blockNumber}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {item.hash.slice(0, 20) + "..."}
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
                {parseFloat(item.value) / 10 ** 18}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                <a
                  href={`https://etherscan.io/tx/${item.hash}`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Details
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
