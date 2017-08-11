import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './app.css';
import 'bootstrap/dist/css/bootstrap.css';
import myApp from './reducers'
import { createStore } from 'redux';

let store = createStore(myApp)


ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
);