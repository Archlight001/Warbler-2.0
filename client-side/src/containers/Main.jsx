import React from "react";
import {Switch,Route,withRouter} from "react-router-dom";
import Homepage from "../components/Homepage";

function Main(props){
    return (
        <div className="container">
            <Route path="/">
                <Homepage />
            </Route>
        </div>
    )
}

export default Main;