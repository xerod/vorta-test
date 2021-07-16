import React from "react";
import { Link } from "react-router-dom";

interface Props {}

const Index = (props: Props) => {
  return (
    <div>
      <p>Say hello to vite :)</p>
      <Link to="/transaction">Transaction</Link>
    </div>
  );
};

export default Index;
