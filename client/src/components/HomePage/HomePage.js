import React, { Component } from 'react'
import axios from 'axios'
import SingleShop from './SingleShop'
import './HomePage.css'

class HomePage extends Component{

    constructor(){
        super()      
        this.state = {
            shops : []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/shops')
             .then(res=>{
                 this.setState({
                     shops : res.data
                 })
             })
    }

    render(){
        const shopsArray = this.state.shops
        return(
            <div className="homepage-main-wrapper">
                <div className="left-wrapper-home hide-on-small-only">
                    <h3>Know shops near you</h3>
                    <img alt="arrow" src={require('../../images/right.svg')}/>
                </div>
                <div className="container right-wrapper-home">
                    <h3 className="center">SHOPS</h3>
                    <div className="row">
                    {shopsArray.map(shop=>(
                        <SingleShop key={shop._id} shopdetail={shop}/>
                    ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage
