import React, { Component } from 'react'
import axios from 'axios'
import store from '../../store/index'
import { setIsLogin} from '../../actions/index'
import M from 'materialize-css'


class LoginUser extends Component{

    constructor(){
        super()
        this.state = {
            email : '',
            password : '',
            Response : null
        }
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    

    onChangeEmail(e){
        this.setState({
            email : e.target.value
        })
    }
    onChangePassword(e){
        this.setState({
            password : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            email : this.state.email,
            password : this.state.password
        }


        axios.post('http://localhost:5000/api/user/login',user)
            .then(res=>{
                const token  = res.data.token
                const user  = res.data.user
                
                localStorage.setItem('jwt',token)
                localStorage.setItem('user_id',(user._id))
                store.dispatch(setIsLogin(true))
                M.toast({html: 'Login Successful', classes:'green'})
                this.props.history.push('/dashboard')
            })
            .catch(err=>{
                console.log(err.response.data)
                M.toast({html: err.response.data, classes:'#ef5350 red lighten-1'})
            })
    
    }

    render(){
        return(
            <div className="main-wrapper">
                <div className="left-wrapper hide-on-small-only ">
                    <div className="container">
                        <h3>Hello, Friend!</h3>
                        <p className="white-text">Create an account and start your journey with us.</p>
                        <a href="/register" className="btn call-to-action">SignUp</a>
                    </div>
                </div>
            

                <div className="right-wrapper ">
                    <div className="container">
                        <h3 className="center">Login</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="input-field">
                                <i class="material-icons prefix">account_circle</i>
                                <input type="text" required onChange={this.onChangeEmail} className="validate" placeholder="Email"/>
                            </div>
                            <div className="input-field">
                                <i class="material-icons prefix">vpn_key</i>
                                <input type="password" required onChange={this.onChangePassword} className="validate" placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Login" className="btn call-to-action" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default LoginUser