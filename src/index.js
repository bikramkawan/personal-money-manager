import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './app.css';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import reducer from './reducers'
import {createStore} from 'redux';
import {HashRouter} from 'react-router-dom'


let store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);