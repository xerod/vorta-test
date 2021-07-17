import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "virtual:generated-pages-react";
import Home from "./pages/index";
import NoMatch from "./pages/[...all]";

const App: React.FC = () => {
  const isAuthenticated = false;

  return (
    <Router>
      {!isAuthenticated && (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      )}
      {isAuthenticated && renderRoutes(routes)}
    </Router>
  );
};

export default App;
export { routes };
