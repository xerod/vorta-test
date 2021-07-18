import React from "react";
import BitcoinChart from "components/modules/BitcoinChart";

const Bitcoin: React.FC = () => {
  return (
    <>
      <div className="py-4 pl-4 mt-6 bg-white border rounded-lg shadow">
        <BitcoinChart />
      </div>
    </>
  );
};

export default Bitcoin;
