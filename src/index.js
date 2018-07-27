import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import Isles from "./Isles";

ReactDOM.render(<Isles />, document.querySelector("#root"));

registerServiceWorker();
