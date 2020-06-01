import React from 'react'

const SingleShop = (props)=>{
    return(        
            <div className="col s12 m6 l4">
                <div className="card">
                    <div className="card-image">
                        <img alt="shop-img" src={require('../../images/pic1.jpg')}/>
                        <a href="#" className="btn-floating pink halfway-fab">
                            <i className="material-icons">favorite</i>
                        </a>
                    </div>
                    <div className="card-content">
                        <span className="card-title">{props.shopdetail.shop_name}</span>
                        <p>{props.shopdetail.shop_address}</p>
                    </div>
                    <div className="card-action">
                        <a href="#" className="pink-text">More Details</a>
                        <a href={`tel:${props.shopdetail.shop_phone}`} className="pink-text">Call</a>
                    </div>
                </div>
            </div>                            
    )
}

export default SingleShop