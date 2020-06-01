import React from 'react'
import { Link } from "react-router-dom";
import './NotFound.css'

const NotFound = ()=>{
    return(
        <div className="not-found-wrapper">
            
                <div className="not-found-left">
                    <h4>I have a bad news for you</h4>
                    <h6>The page you are looking for might be <br/> removed or is temporarily unavailable.</h6>
                    <Link to="/" className="btn call-to-action">Come Home</Link>
                </div>

                <div className="not-found-right">
                    <img alt="not-found-img" src={require('../../images/not-found.png')}/>
                </div>
            
        </div>
        
    )
}

export default NotFound