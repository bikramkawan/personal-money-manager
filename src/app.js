/**
 * Created by bikramkawan on 8/9/17.
 */
import React, {Component} from 'react';
import AddTransaction from './components/AddTransaction'
import {Route} from 'react-router-dom'
import Menu from './components/Menu'


class App extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.store;

    }

    render() {
        return (
            <div className="app">
                <Menu/>
                <Route path='/AddTransaction/' component={()=> <AddTransaction store={this.store}/>}/>
            </div>)
    }

}

export default App