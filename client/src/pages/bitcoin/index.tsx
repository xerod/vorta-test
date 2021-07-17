import React from "react";
import BitcoinChart from "components/modules/BitcoinChart";
import RouteGuard from "components/templates/RouteGuard";

const Bitcoin: React.FC = () => {
  return (
    <RouteGuard>
      <BitcoinChart />
    </RouteGuard>
  );
};

export default Bitcoin;
