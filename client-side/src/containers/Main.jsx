import React from "react";
import {Switch,Route,withRouter} from "react-router-dom";
import Authform from "../components/Authform";
import Homepage from "../components/Homepage";

function Main(props){
    return (
        <div className="container">
            <Route exact path="/">
                <Homepage />
            </Route>

            <Route exact path="/signup">
                <Authform heading="Join Warbler Today." buttonText="Sign me Up" signup />
            </Route>

            <Route exact path="/signin">
                <Authform heading="Welcome back." buttonText="Sign in"  />
            </Route>
        </div>
    )
}

export default Main;