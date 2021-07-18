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
import {
  authenticationService,
  userSubjectType,
} from "./shared/services/auth.service";
import { userService } from "./shared/services/user.service";
import Layout from "components/layouts/Layout";

const App: React.FC = () => {
  return (
    <Router>
      {!authenticationService.currentUserValue && (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      )}
      {authenticationService.currentUserValue && (
        <Layout>{renderRoutes(routes)}</Layout>
      )}
    </Router>
  );
};

export default App;
export { routes };
