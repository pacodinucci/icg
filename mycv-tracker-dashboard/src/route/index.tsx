import React, {
  memo
} from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import LoginPage from "pages/Login";

import {
  LOGIN_PATH
} from "data/route-path";

import "/assets/style/index.scss";

function MainApp() : JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={ LOGIN_PATH }
          component={ LoginPage } />
      </Switch>
    </BrowserRouter>
  );
}

export default memo(MainApp);
