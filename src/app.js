/**
 * Created by bikramkawan on 8/9/17.
 */
import React, {Component} from 'react';
import AddTransaction from './components/AddTransaction'
import {Route} from 'react-router-dom'
import Menu from './components/Menu'
import Report from './components/Report'

const data = [{
    "id": 1,
    "date": "01.01.2017",
    "payment": "Room Rent",
    "category": "Housing",
    "debit":'' ,
    "credit": 430
}, {
    "id": 2,
    "date": "02.01.2017",
    "payment": "Happy Noodles",
    "category": "Lunch Outside",
    "debit": '',
    "credit": 4
}, {
    "id": 3,
    "date": "03.01.2017",
    "payment": "XYZ",
    "category": "Salary",
    "debit": 2000,
    "credit": ''
}, {
    "id": 4,
    "date": "04.01.2017",
    "payment": "drei",
    "category": "Mobile",
    "debit":'',
    "credit": 15
}, {
    "id": 5,
    "date": "05.01.2017",
    "payment": "Hofer",
    "category": "Groceries",
    "debit": '',
    "credit": 20
}];


class App extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.store;

    }

    open = ()=> {

    }

    render() {
        return (
            <div className="app">
                <Menu/>

                <Route path='/AddTransaction/' component={()=> <AddTransaction store={this.store} data={data}/>}/>
                <Route path='/Report/' component={()=> <Report store={this.store} data={data}/>}/>
            </div>)
    }

}

export default App