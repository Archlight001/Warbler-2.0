import React from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./Main";
import Navbar from "./Navbar";
import "../css/App.css";

import "../css/App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
