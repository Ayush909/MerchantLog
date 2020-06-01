import React from 'react'
import {Route,Redirect,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'


const ProtectedDashboard = ({ component : Component , isLogged , ...rest} )=>{
    return(
        <Route {...rest} render={
            (props) => {
                if(isLogged || localStorage.getItem('jwt')){
                    return (
                        <Component {...props}/>
                    )
                }else{
                    return(
                        <Redirect to={
                            {
                                pathname : "/login",
                                state : {
                                    from : props.location
                                }
                            }
                        }/>
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

export default withRouter(connect(mapStateToProps,null,null,{ pure: false })(ProtectedDashboard))