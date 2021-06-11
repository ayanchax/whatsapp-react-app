import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Sidebar from "./Sidebar";

function App() {
  return (
    // BEM convention
    <div className="app" >
      <div className="app__body">

        <Sidebar />

        {/* Chat */}
      </div>

    </div>
  );
}

export default App;