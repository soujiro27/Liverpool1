import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Products from './Components/products'

const root = document.getElementById('root');




axios.get('/all')
.then(response => {
    render(<Products data={response.data} />, root);
})