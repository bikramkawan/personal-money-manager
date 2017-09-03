/**
 * Created by bikramkawan on 8/12/17.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './Rows/Header'
import Transaction from './Rows/Transaction'
import AddItem from './Rows/AddItem';
import  {isSaved} from '../actions'
import {Grid, Row, Col, Button, FormGroup, Form, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import AlertDismissable from './AlertDismissable'
import * as _ from 'lodash';
import * as $ from 'jquery'
import SelectBox from './SelectBox/SelectBox';
import {userdata} from '../config/Firebase'


class AddTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            fields: {
                payment: null,
                category: null,
                debit: null,
                credit: null,
                date: null,
            },
            isEditMode: false,
            updateIndex: {},
            value: '',
            isDisableSaveButton: true,
            sortByAsc: true,

        }

        this.store = this.props.store;
    }

    editRow = (uniqueKey) => {
        this.setState({isEditMode: true});
        const index = this.state.data.findIndex(d=>d._id === uniqueKey);
        const temp = this.state.data.slice();
        const obj = temp[index];
        this.setState({fields: obj})


    }


    deleteRow = (uniqueKey) => {

        const index = this.state.data.findIndex(d=>d._id === uniqueKey);
        const temp = this.state.data.slice();
        temp.splice(index, 1);
        this.setState({data: temp}, ()=>this.props.onDelete(uniqueKey))


    }
    handleChange = (args)=> {

        if (!_.isUndefined(args.uniqueKey)) {
            const obj = this.state.fields
            const updateObj = {...obj, [args.ref]: args.value};
            this.setState({
                fields: updateObj,
            }, ()=>this.props.onUpdate(args.uniqueKey, updateObj))

        }

        const fields = {...this.state.fields, [args.ref]: args.value}
        this.setState({fields: fields})


    }
    onSortByName = () => {
        const data = this.state.data.slice();
        const sortBy = this.state.sortByAsc ? 'asc' : 'desc';
        const sortedData = _.orderBy(data, 'payment', sortBy)
        this.setState({data: sortedData, sortByAsc: !this.state.sortByAsc})

    }

    onSortBy = (ref) => {
        const data = this.state.data.slice();
        const sortBy = this.state.sortByAsc ? 'asc' : 'desc';
        const sortedData = _.orderBy(data, ref, sortBy)
        this.setState({data: sortedData, sortByAsc: !this.state.sortByAsc})

    }


    save = ()=> {

        console.log(this.state)
        if (this.state.isEditMode) {
            // const temp = this.state.data.slice();
            // temp.splice(this.state.updateIndex, 1, this.state.fields)
            // this.setState({data: temp, isDisableSaveButton: true})
            // console.log(this.state.data)

        } else {

            this.props.onSave(this.state.fields)
        }


        //  this.store.dispatch(isSaved());

    }


    handleSelect = (categoryName) => {
        this.setState({fields: {...this.state.fields, category: categoryName}})
    }


    isValidateItem = (isValid)=> {

        if (isValid) {
            this.setState({isDisableSaveButton: false})
        } else {
            this.setState({isDisableSaveButton: true})
        }
    }


    componentDidMount() {
        const {userid} = this.props;
        const thisUser = userdata.child(userid);
        thisUser.on('value', (snap, i)=> {
            let data = [];
            snap.forEach((d, i)=>{
              data.push(d.val())

            })
       this.setState({data})
        })


    }

    render() {
    console.log(this.state)
        return (<Grid fluid={true}>
                <Header onSortBy={this.onSortBy}/>
                {this.state.data.map((data, index)=>
                <Transaction data={data} onDeleteRow={this.deleteRow}
                onChange={this.handleChange}
                onEdit={this.editRow}
                uniqueKey={data._id}
                onSelect={this.handleSelect}
                id={index}
                key={index}
                isValidItem={this.isValidateItem}

                />)}
                <AddItem onChange={this.handleChange} onSelect={this.handleSelect}
                         isValidItem={this.isValidateItem}/>

                <Row className="saveRow">
                    <Col md={2} className="saveCol">
                        <Button bsStyle="primary" className="saveButton" disabled={this.state.isDisableSaveButton}
                                onClick={this.save}>Save</Button>
                    </Col>

                </Row>

            </Grid>
        )
    }

}

export default AddTransaction