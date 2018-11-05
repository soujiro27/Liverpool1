import React, { Component } from 'react';


export default class Form extends Component{
    
    
    submit = (event) => {
        event.preventDefault();
        

    }

    
    
    render(){
        return(
            <form action="/send" method="POST" encType='multipart/form-data' onSubmit={this.submit}>
                <label htmlFor="name">Nombre del Producto</label>
                <input type="text" name="name" id="name" placeholder="Nombre" required />

                <label htmlFor="price">Precio</label>
                <input type="number" name="price" id="price" placeholder="$" pattern="[0-9]" required />

                <label htmlFor="file">Imagen del Producto</label>
                <input type="file" name="file" id="file" />
                
                <input type="submit" value="Guardar" />
            </form>
        )
    }
}