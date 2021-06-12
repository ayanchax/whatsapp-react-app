import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StateProvider } from "./StateProvider"
import reducer, { initialState } from "./reducer";
ReactDOM.render(
  <React.StrictMode>
    {/* Wrapping our App inside a React Context StateProvider Data Layer and implementing the concept 
        of initial state and reducer(Redux) on react app context which basically receives actions 
        from the user interface(especially via server response) and performs the job requested by the user */}
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
