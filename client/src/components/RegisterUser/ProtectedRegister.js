import React from 'react'
import {Route,Redirect,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'


const ProtectedRegister = ({ component : Component , isLogged , ...rest} )=>{
    return(
        <Route {...rest} render={
            (props) => {
                if(isLogged || localStorage.getItem('jwt')){
                    
                    return(
                        <Redirect to={
                            {
                                pathname : "/dashboard",
                                state : {
                                    from : props.location
                                }
                            }
                        }/>
                    )
                }else{
                    return (
                        <Component {...props}/>
                    )
                }
                
            }
        } />
    )
}

const mapStateToProps = (state)=>{
    return{
        isLogged : state.isLoginReducer.isLogged
    }
}

export default withRouter(connect(mapStateToProps,null,null,{ pure: false })(ProtectedRegister))