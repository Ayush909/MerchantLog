import React from 'react'
import {Link} from 'react-router-dom'
import './Footer.css'

const Footer = ()=>{
    return(
        <div className="footer">
            
            <ul>
                <li>
                    <Link to="/" className="footer-links">Home</Link>
                </li>
                <li>
                    <Link to="/" className="footer-links">About</Link>
                </li>                
                <li>
                    <Link to="/" className="footer-links">Contact</Link>
                </li>                
                <li>
                    <Link to="/" className="footer-links">Terms & Conditions</Link>
                </li>                
                <li>
                    <Link to="/" className="footer-links">Privacy Policy</Link>
                </li>                
            </ul>
            <h3 className="center">MerchantLog.</h3>
            <h4 className="center">All rights reserved. 2020</h4>
        </div>
    )
}

export default Footer