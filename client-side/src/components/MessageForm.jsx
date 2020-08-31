import React from "react";
import {connect} from "react-redux"

function MessageForm(props){
    return (
        <div>
            "Message Form"
        </div>
    )
}

function mapReduxStatetoProps(state){
    return {
        errors:state.errors
    }
}

export default connect(mapReduxStatetoProps)(MessageForm);