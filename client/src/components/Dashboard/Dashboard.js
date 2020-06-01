import React, { Component } from 'react'
import axios from 'axios'
import './Dashboard.css'
import M from 'materialize-css'


class Dashboard extends Component{
    constructor(){
        super()
        this.state = {
            isLoading : false,
            user_id : localStorage.getItem('user_id'),
            shop_name : '',
            shop_address : '',
            shop_phone : '',
            isShopRegistered : '',
        }
        this.onChangeShopName = this.onChangeShopName.bind(this)
        this.onChangeShopAddress = this.onChangeShopAddress.bind(this)
        this.onChangeShopPhone = this.onChangeShopPhone.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.formValidation = this.formValidation.bind(this)
        this.formvalidate = this.formvalidate.bind(this)
    }

    componentDidMount(){
        let arr ;
        axios.post('/api/isShopReg',{user_id : localStorage.getItem('user_id')})
            .then(res=>{
                arr = res.data
                if(arr){
                    this.setState({
                        isShopRegistered : true
                    })
                }else{
                    this.setState({
                        isShopRegistered : false
                    })
                }
            })
    }

    // componentDidMount(){
    //     //axios.post(url,data,config) <== this is standard
    //     //axios.get(url,config,data) <== this is standard
    //     this.setState({
    //         isLoading : true
    //     })
    //     axios.post('http://localhost:5000/api/userdata',{
    //         user_id : localStorage.getItem('user_id')
    //     },{
    //         headers : {
    //             'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
    //         }
    //     })
    //     .then(res=>{
    //         console.log(res.data)
    //         this.setState({
    //             name : res.data.user.name,
    //             email: res.data.user.email,
    //             isLoading : false
    //         })
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // }

    onChangeShopName(e){
        this.setState({
            shop_name : e.target.value
        })
    }
    onChangeShopAddress(e){
        this.setState({
            shop_address : e.target.value
        })
    }
    onChangeShopPhone(e){
        this.setState({
            shop_phone : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const shop = {
            user_id : this.state.user_id,
            shop_name : this.state.shop_name,
            shop_address : this.state.shop_address,
            shop_phone : this.state.shop_phone
        }

        axios.post('/api/userdata',shop,{
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then(res=>{
            // console.log(res.data)
            M.toast({html: 'Shop Registered', classes:'green'})
            window.location = '/'
        })
        .catch(err=>{
            M.toast({html : err.response.data,classes:'#ef5350 red lighten-1'})
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
            shopname : /^[a-zA-Z0-9 ]{3,35}$/,
            shopaddress : /^[a-zA-Z0-9 -:/.&]{10,100}$/,
            shopphone : /^[0-9]{10}$/

        }
        // console.log(e.target.attributes.name.value)
        this.formvalidate(e.target,patterns[e.target.attributes.name.value])
        
    }

    render(){
        return(
            <div className="dashboard-main-wrapper"> 
                <div className="left-dash-wrapper hide-on-small-only">
                    <div className="container ">
                        <h3>Let the world know about<br/>your shop :)</h3><br/>
                        <h4>Benefits of Joining with us!</h4>
                        <ul>
                            <li>Growth in the online retail market.</li>
                            <li>Get orders across India.</li>
                            <li>Earn big.</li>
                        </ul>
                    </div>
                </div>
               
                <div className="right-dash-wrapper">
                         
                    {this.state.isShopRegistered? 
                        <div className="container">
                            <h6>Shop already registered</h6>
                        </div>
                         
                    
                    : 
                        <div className="container">
                            <h3 className="center">Register Your Shop</h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="input-field">                                    
                                    <input 
                                        type="text"
                                        name = "shopname" 
                                        required 
                                        onChange={this.onChangeShopName}
                                        onKeyUp={this.formValidation} 
                                        className="" 
                                        placeholder="Shop Name"
                                    />
                                    <p>Shop name must be 3-35 characters long</p>
                                </div>
                                <div className="input-field">
                                    <input 
                                        type="text" 
                                        name="shopaddress"
                                        required 
                                        onChange={this.onChangeShopAddress}
                                        onKeyUp={this.formValidation} 
                                        className="" 
                                        placeholder="Shop Address"
                                    />
                                    <p>Address can be alphanumeric and be 10-100 characters long.</p>
                                </div>
                                <div className="input-field">
                                    <input 
                                        type="text"
                                        name="shopphone" 
                                        required 
                                        onChange={this.onChangeShopPhone}
                                        onKeyUp={this.formValidation} 
                                        className="" 
                                        placeholder="Shop Phone Number"
                                    />
                                    <p>Phone number must be 10 digits only.</p>
                                </div>
                                <div >
                                    <input type="submit" value="Register Shop" className="btn call-to-action" />
                                </div>
                            </form>
                       </div> 
                    }           
                        
                    
                </div>
            </div>
        )
    }
    
}

export default Dashboard