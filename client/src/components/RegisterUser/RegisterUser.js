import React, { Component } from 'react'
import axios from 'axios'
import './RegisterUser.css'
import M from 'materialize-css'

class RegisterUser extends Component{

    constructor(){
        super()
        this.state = {
            name : '',
            email : '',
            password : '',
            nameErr: 'name error msg',
            emailErr : '',
            passwordErr : ''
           
        }
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.formValidation = this.formValidation.bind(this)
        this.formvalidate = this.formvalidate.bind(this)
    }

    onChangeName(e){
        this.setState({
            name : e.target.value
        })
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
        const newUser = {
            name : this.state.name,
            email : this.state.email,
            password : this.state.password
        }

        console.log(newUser)
        axios.post('/api/user/register',newUser)
                .then(res=>{
                    console.log(res.data)
                    M.toast({html: 'Account created!', classes:'green'})
                    window.location = '/login'
                })
                .catch(err=>{
                    console.log(err.response.data)
                    M.toast({html: err.response.data, classes:'#ef5350 red'})
                })
      
    }

    formvalidate(field,regex){
        if(regex.test(field.value)){
            field.className = "valid"
            
        }else{
            field.className = "invalid"
            
        }
    }

    formValidation(e){
        // const inputs = document.querySelectorAll("input")
        const patterns = {
            name : /^[a-zA-Z ]{3,35}$/,
            email : /^([a-zA-Z0-9\.-]+)@([a-z0-9-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
            password : /^[a-zA-Z0-9@_-]{6,25}$/

        }
        // console.log(e.target.attributes.name.value)
        this.formvalidate(e.target,patterns[e.target.attributes.name.value])
        
    }

    render(){
        return(
            <div className="main-wrapper">
                <div className="left-wrapper hide-on-small-only ">
                    <div className="container">
                        <h3>Welcome Back!</h3>
                        <p className="white-text">To keep connected with us please <br/>login with your details</p>
                        <a href="/login" className="btn call-to-action">Login</a>
                    </div>
                </div>

                <div className="right-wrapper ">
                    <div className="container">
                        <h3 className="center">Create Account</h3>
                        <form onSubmit={this.onSubmit} >
                            <div className="input-field">
                                <i class="material-icons prefix">account_circle</i>
                                <input  
                                    type="text"
                                    name="name" 
                                    required 
                                    onChange={this.onChangeName}
                                    onKeyUp={this.formValidation} 
                                    className="" 
                                    placeholder="Name"                                      
                                />
                                <p>Name must be alphabets only and atleast 6 characters long</p>
                            </div>

                            <div className="input-field">
                                <i className="material-icons prefix">email</i>
                                <input 
                                    type="email"
                                    name="email" 
                                    required 
                                    onChange={this.onChangeEmail} 
                                    onKeyUp={this.formValidation} 
                                    className="" 
                                    placeholder="Email" 
                                                                    
                                />
                                <p>Email must be a valid address, e.g. me@mydomain.com</p>
                            </div>

                            <div className="input-field">
                                <i className="material-icons prefix">lock</i>
                                <input 
                                    type="password"
                                    name="password" 
                                    required 
                                    onChange={this.onChangePassword}
                                    onKeyUp={this.formValidation}  
                                    className="" 
                                    placeholder="Password" 
                                    
                                />
                                <p>Password must be alphanumeric(@,_ and - are also allowed) and be 6-25 characters.</p>
                            </div>
                            <div >
                                <input type="submit" value="Register" className="btn call-to-action" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default RegisterUser