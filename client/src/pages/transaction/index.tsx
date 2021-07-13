import React, { useState } from "react";

export default function Page() {
  const [address, setAddress] = useState("");

  return (
    <>
      <h1>Transactions</h1>

      <div className="flex flex-col space-y-4 min-w-xl">
        <input
          className="px-6 py-2 border rounded"
          placeholder="Input address here"
          onChange={(e) => setAddress(e.target.value)}
        />
        <a href={`/transaction/${address}`}>
          <button
            className="px-6 py-2 text-white bg-blue-600 rounded disabled:opacity-80 disabled:cursor-not-allowed"
            disabled={!address}
          >
            Lookup
          </button>
        </a>
      </div>
    </>
  );
}
