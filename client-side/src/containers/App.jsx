import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "../store";
import jwtDecode from "jwt-decode";
import Main from "./Main";
import Navbar from "./Navbar";
import "../css/App.css";
import { setAuthorizationToken, setCurrentUser } from "../store/actions/auth";
import HSFooter from "./HSFooter";


const store = configureStore();



function App() {
  var [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    if (localStorage.jwtToken) {
      setAuthorizationToken(localStorage.jwtToken);
      try {
        // let tokenData = jwtDecode(localStorage.jwtToken);
        // apiCall("get", `/api/userops/${tokenData.id}/getProfileImage/`)
        //   .then((res)=>{
        //     store.dispatch(setCurrentUser({...tokenData,profileImage:res.profileImage}));
        //   })
        //   .catch((e) => {
        //     console.log(e);
        //   });
  
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
      } catch (e) {
        console.log(e);
        store.dispatch(setCurrentUser({}));
      }
    }
  }, []);


  function showSidebar() {
    setSidebar(!sidebar);
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="main__combo__component">
          <div className="main__nav__component">
            <Navbar sidebar={sidebar} showSidebar={showSidebar} />
          </div>

          <div className={window.screen.width < 600 ? "main__component" : ""}>
            <Main sidebar={sidebar} showSidebar={showSidebar} />
          </div>

          <div className="main__footer__component">
            {window.screen.width < 600 && <HSFooter />}
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
