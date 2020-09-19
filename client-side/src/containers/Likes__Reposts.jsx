import React from 'react'
import { connect } from 'react-redux'

export const Likes__Reposts = (props) => {
    console.log(props.list);
    return (
        <div>
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})



export default connect(mapStateToProps)(Likes__Reposts)
