import React, { useState } from "react";
import { Link } from "react-router-dom";

const TransactionPage: React.FC = () => {
  const [address, setAddress] = useState("");

  return (
    <>
      <div className="mt-6 space-y-4 sm:flex min-w-xl">
        <div className="w-full px-4 py-12 bg-white border rounded-lg shadow sm:px-6 p-16 lg:p-24">
          <div className="sm:flex w-full mt-2">
            <div>
              <label htmlFor="walletId" className="sr-only">
                Your wallet id
              </label>
              <input
                id="walletId"
                name="email"
                type="text"
                autoComplete="email"
                required
                className="w-full px-5 py-3 placeholder-gray-500 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your wallet address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <label className="text-sm text-gray-400">
                example: 0xb3746d30f2a579a2efe7f2f6e8e06277a78054c1
              </label>
            </div>
            <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <Link to={`/transaction/${address}`} className="outline-none">
                <button
                  type="submit"
                  className="flex items-center justify-center w-full px-5 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md not-disabled:hover:bg-indigo-700 focus:outline-none not-disabled:focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-80 disabled:cursor-not-allowed disabled:outline-none"
                  disabled={!address}
                >
                  Lookup Transaction
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionPage;
