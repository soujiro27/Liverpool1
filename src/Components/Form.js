import React, { Component } from 'react';
import axios from 'axios';

export default class Form extends Component{
    
    
    submit = (event) => {
        event.preventDefault();
        let name = document.getElementById('name').value;
        let price = document.getElementById('price').value;
        let $form = document.querySelectorAll('input');
        
        
        if( name && price && parseInt(price)){
           if($form[2].files[0]){
               let form = new FormData();
               form.append('name', $form[0].value);
               form.append('price', $form[1].value);
               form.append('file',$form[2].files[0])
               form.append('nameFile', $form[2].files[0].name);
               axios.post('/send',form)
               .then(response => {
                   location.href = '/';
               })
           }else{
               alert('Adjunte imagen del producto')
           }
        } else{
            alert('falso')
        }

    }

    

    
    
    render(){
        return(
            <form  method="POST" encType='multipart/form-data' onSubmit={this.submit}>
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