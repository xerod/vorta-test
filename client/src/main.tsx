import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "virtual:generated-pages-react";
import "virtual:windi.css";
import Layout from "components/layouts/Layout";

console.log(routes);

ReactDOM.render(
  <Router>
    <Layout>{renderRoutes(routes)}</Layout>
  </Router>,
  document.getElementById("root")
);

export { routes };
