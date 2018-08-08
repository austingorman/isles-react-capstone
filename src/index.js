import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "typeface-roboto";
import { BrowserRouter as Router } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import Isles from "./Isles";
import history from "./history";

ReactDOM.render(
  <Router history={history}>
    <Isles />
  </Router>,
  document.querySelector("#root")
);

registerServiceWorker();
