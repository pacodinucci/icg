import React from "react";
import {
  render 
} from "react-dom";

import MainApp from "route";
import {
  createBrowserHistory 
} from "history";

const history = createBrowserHistory();

const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
if (path) {
  history.replace(path);
}

function Main() : JSX.Element {
  return (
    <MainApp />
  );
}

render(<Main />, document.getElementById("root"));
