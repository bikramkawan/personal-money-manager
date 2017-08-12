import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './app.css';
import 'bootstrap/dist/css/bootstrap.css';
import myApp from './reducers'
import { createStore } from 'redux';
import {HashRouter} from 'react-router-dom'


let store = createStore(myApp)


ReactDOM.render(
  <HashRouter><App store={store}/></HashRouter>,
  document.getElementById('root')
);