import React from "react";
import { useHistory } from "react-router";
import Layout from "../layouts/Layout";

const RouteGuard: React.FC = ({ children }) => {
  const isAuthenticated = true;
  const history = useHistory();

  if (!isAuthenticated) {
    history.push("/");
    return <p>Ooops you don't have any access</p>;
  }

  return <Layout>{children}</Layout>;
};

export default RouteGuard;
