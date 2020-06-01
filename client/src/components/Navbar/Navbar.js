import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { setIsLogin} from '../../actions/index'
import './Navbar.css'
import M from 'materialize-css'
 
class Navbar extends Component{
    constructor(){
        super()
        this.SignOutUser = this.SignOutUser.bind(this)
    }
    
    componentDidMount(){
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.sidenav');
            var instances = M.Sidenav.init(elems)
          });
    }

    SignOutUser(e){

        if (typeof Storage !== "undefined") {
            // Check if JWT is already saved in the local storage.
            if (localStorage.getItem("jwt") !== null) {
              // If there's something, remove it.
              localStorage.removeItem("jwt");
              localStorage.removeItem("user_id")
              M.toast({html: 'Logged Out', classes:'green'})
            }
          }
          this.props.setIsLogin()
        
    }
    
    
    render(){
        
        return(
            <div >
                <nav className="nav-wrapper">
                    <div className="nav-items-wrapper">
                        <Link to="/" id="logo" className="brand-logo">MerchantLog</Link>
                        <a href="#" className="sidenav-trigger" data-target="mobile-links">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            <li>
                                <Link to="/" >Home</Link>
                            </li>
                            {this.props.isLogged || localStorage.getItem('jwt') !== null ?
                                null : <li>
                                        <Link to="/login" >Login</Link>
                                       </li>
                            }
                            {this.props.isLogged || localStorage.getItem('jwt') !== null ?
                                null : <li>
                                        <Link to="/register" >Register</Link>
                                       </li>
                            }
                            <li>
                                <Link to="/" >Contact</Link>
                            </li>
                            {this.props.isLogged || localStorage.getItem('jwt') !== null ? 
                            <li>
                                <Link to="/dashboard" className="nav-link" >Dashboard</Link>   
                                                                                                          
                            </li> : null }
                            {this.props.isLogged || localStorage.getItem('jwt') !== null ? 
                            <li>
                                   
                                <Link to="/" className="nav-link" onClick={this.SignOutUser}>SignOut</Link>                                                                             
                                                                                                          
                            </li> : null }
                                        
                        
                        </ul>
                    </div>
                </nav>
                <ul className="sidenav" id="mobile-links">
                    <li>
                        <Link to="/" className="sidenav-close">Home</Link>
                    </li>
                    <li>
                        <Link to="/login" className="sidenav-close">Login</Link>
                    </li>
                    <li>
                        <Link to="/register" className="sidenav-close">Register</Link>
                    </li>
                    <li>
                        <Link to="/" className="sidenav-close">Contact</Link>
                    </li>
                    {this.props.isLogged || localStorage.getItem('jwt') !== null ? 
                    <li>
                        <Link to="/" className="nav-link sidenav-close" onClick={this.SignOutUser}>SignOut</Link>                                                                             
                    </li> : null }
                </ul>
            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    //console.log(state.isLoginReducer.initLogin.isLogged)
    return{
        isLogged : state.isLoginReducer.isLogged
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        setIsLogin : ()=> dispatch(setIsLogin(false))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)