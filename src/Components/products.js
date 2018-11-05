import React, { Component } from 'react';

export default class Products extends Component{

    render(){
        
        return(
            <div className="container">
            
                {
                    this.props.data.map(item=>{
                        return(
                        <div className="product" key={item.id}>
                            <img src={`${item.nameFile}`} />
                            <h3>Producto: {item.name}</h3>
                            <p>Precio: ${item.price}</p>
                        </div>)
                    })
                }
            </div>
        )
    }

}