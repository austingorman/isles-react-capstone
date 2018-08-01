import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "typeface-roboto";
import { BrowserRouter as Router } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import Isles from "./Isles";

ReactDOM.render(
  <Router>
    <Isles />
  </Router>,
  document.querySelector("#root")
);

registerServiceWorker();
