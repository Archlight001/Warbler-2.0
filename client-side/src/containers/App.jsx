import React,{useState} from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "../store";
import jwtDecode from "jwt-decode";
import Main from "./Main";
import Navbar from "./Navbar";
import "../css/App.css";
import { setAuthorizationToken, setCurrentUser } from "../store/actions/auth";

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (e) {
    store.dispatch(setCurrentUser({}));
  }
}

function App() {
  var [sidebar,setSidebar] = useState(false)

  function showSidebar(){
    setSidebar(!sidebar)
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Navbar sidebar={sidebar} showSidebar={showSidebar} />
          <Main sidebar={sidebar} showSidebar={showSidebar} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
