import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "../store";
import Main from "./Main";
import Navbar from "./Navbar";
import "../css/App.css";

import "../css/App.css";

const store = configureStore();
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Navbar />
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
