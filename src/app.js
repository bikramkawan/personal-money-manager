/**
 * Created by bikramkawan on 8/9/17.
 */
import React, {Component} from 'react';
import InputBox from './components/InputBox/InputBox';
import * as $ from 'jquery';

const data = [{
    "id": 1,
    "date": "01.01.2017",
    "payment": "Room Rent",
    "category": "Housing",
    "debit": "",
    "credit": ""
}, {
    "id": 2,
    "date": "02.01.2017",
    "payment": "Happy Noodles",
    "category": "Lunch Outside",
    "debit": "",
    "credit": "4"
}, {
    "id": 3,
    "date": "03.01.2017",
    "payment": "XYZ",
    "category": "Salary",
    "debit": "2000",
    "credit": ""
}, {
    "id": 4,
    "date": "04.01.2017",
    "payment": "drei",
    "category": "Mobile",
    "debit": "",
    "credit": "15"
}, {
    "id": 5,
    "date": "05.01.2017",
    "payment": "Hofer",
    "category": "Groceries",
    "debit": "",
    "credit": "20"
}];


class App extends Component {


    constructor() {
        super();
        this.state = {
            data: data,
            fields: {
                id: '',
                date: '',
                payment: '',
                category: '',
                debit: '',
                credit: ''
            },
            isEditMode: false
        }
    }


    renderRow() {
        const rows = this.state.data.map(d=><div className="row" data-id={d.id}>
            <div className="col-md-1 items">{d.id}</div>
            <div className="col-md-2 items">{d.date}</div>
            <div className="col-md-3 items">{d.payment}</div>
            <div className="col-md-2 items">{d.category}</div>
            <div className="col-md-1 items">{d.debit}</div>
            <div className="col-md-1 items">{d.credit}</div>
            <div className="col-md-1 items">
                <a href="#">
                    <span onClick={this.editRow.bind(this, d.id)} className="glyphicon glyphicon-edit"></span>
                </a>
            </div>
            <div className="col-md-1 items">
                <a href="#">
                    <span onClick={this.deleteRow.bind(this, d.id)} className="glyphicon glyphicon-trash"></span>
                </a>
            </div>

        </div>)

        return rows;

    }


    dangerRow() {
        return {__html: 'First &middot; Second'};
    }


    editRow = (id) => {
        const index = this.state.data.findIndex(d=>d.id === id);

    }


    deleteRow = (id) => {
        const index = this.state.data.findIndex(d=>d.id === id);
        const temp = this.state.data.slice();
        temp.splice(index, 1);
        this.setState({data: temp})


    }
    handleChange = (ref, args)=> {

        const fields = {...this.state.fields, [ref]: args}
        this.setState({fields: fields})

    }

    save = ()=> {
        const temp = this.state.data;
        temp.push(this.state.fields)
        this.setState({data: temp})

    }

    render() {
        console.log(this.state)
        return (<div className="app">
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-md-1 heading">#</div>
                    <div className="col-md-2 heading">Date</div>
                    <div className="col-md-3 heading">Payment Description</div>
                    <div className="col-md-2 heading">Category</div>
                    <div className="col-md-1 heading">Debit</div>
                    <div className="col-md-1 heading">Credit</div>
                </div>
                {this.renderRow()}

                <div className="row">
                    <div className="col-md-1 ">
                        <InputBox
                            ref='id'
                            placeholder="Enter #.."
                            onChange={this.handleChange.bind(this, 'id')}/>
                    </div>
                    <div className="col-md-2">
                        <InputBox
                            ref='date'
                            placeholder="Enter date.."
                            onChange={this.handleChange.bind(this, 'date')}/></div>
                    <div className="col-md-3">
                        <InputBox
                            ref='payment'
                            placeholder="Enter description.."
                            onChange={this.handleChange.bind(this, 'payment')}/>
                    </div>
                    <div className="col-md-2">
                        <InputBox
                            ref='category'
                            placeholder="Enter cateogry.."
                            onChange={this.handleChange.bind(this, 'category')}/>
                    </div>
                    <div className="col-md-1">
                        <InputBox
                            ref='debit'
                            placeholder="Enter debit.."
                            onChange={this.handleChange.bind(this, 'debit')}/></div>
                    <div className="col-md-1">
                        <InputBox
                            ref='credit'
                            placeholder="Enter credit.."
                            onChange={this.handleChange.bind(this, 'credit')}/>
                    </div>
                </div>


                <div className="row saveRow">
                    <div className="col-md-2 saveCol">
                        <button type="button" className="btn btn-primary saveButton" onClick={this.save}>Save</button>
                    </div>

                </div>
            </div>


        </div>)
    }

}

export default App