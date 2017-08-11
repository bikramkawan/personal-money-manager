/**
 * Created by bikramkawan on 8/9/17.
 */
import React, {Component} from 'react';
import Header from './components/Rows/Header'
import Transaction from './components/Rows/Transaction'
import AddItem from './components/Rows/AddItem';
import  {isSaved} from './actions'
import * as _ from 'lodash'

const data = [{
    "id": 1,
    "date": "01.01.2017",
    "payment": "Room Rent",
    "category": "Housing",
    "debit": "",
    "credit": "430"
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


    constructor(props) {
        super(props);
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
            isEditMode: false,
            updateData: {},

        }
        this.store = this.props.store;
    }

    editRow = (id) => {
        this.setState({isEditMode: true});

    }


    deleteRow = (id) => {
        const index = this.state.data.findIndex(d=>d.id === id);
        const temp = this.state.data.slice();
        temp.splice(index, 1);
        this.setState({data: temp})


    }
    handleChange = (args)=> {
        if (!_.isUndefined(args.id)) {
            const index = this.state.data.findIndex(d=>d.id === args.id);
            const temp = this.state.data.slice();
            const obj = temp[index];
            const updateObj = {...obj, [args.ref]: args.value};
            this.setState({updateData: {index: index, data: updateObj}})


        }
        const fields = {...this.state.fields, [args.ref]: args.value}
        this.setState({fields: fields})


    }


    save = ()=> {
        if (this.state.isEditMode) {
            const temp = this.state.data.slice();
            temp.splice(this.state.updateData.index, 1, this.state.updateData.data)
            this.setState({data: temp, isEditMode: false})

        } else {
            const temp = this.state.data;
            temp.push(this.state.fields)
            this.setState({data: temp})
        }

        this.store.dispatch(isSaved());

    }

    render() {

        return (<div className="app">
            <div className="container-fluid ">
                <Header/>
                {this.state.data.map(data=>
                    <Transaction data={data} onDeleteRow={this.deleteRow}
                                 onChange={this.handleChange}
                                 onEdit={this.editRow}
                                 store={this.props.store}
                                 key = {data.id}
                    />)}
                <AddItem onChange={this.handleChange}/>
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