import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './app.css';
import 'bootstrap/dist/css/bootstrap.css';
// import 'jquery';
// import 'bootstrap/dist/js/bootstrap.js';

import myApp from './reducers'
import {createStore} from 'redux';
import {HashRouter} from 'react-router-dom'


let store = createStore(myApp)


ReactDOM.render(
    <HashRouter><App url='http://localhost:3001/api/records' store={store}/></HashRouter>,
    document.getElementById('root')
);