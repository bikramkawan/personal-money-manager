/**
 * Created by bikramkawan on 8/12/17.
 */
import React, {Component} from 'react';
import Header from './Rows/Header'
import Transaction from './Rows/Transaction'
import AddItem from './Rows/AddItem';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as d3 from 'd3'
import * as _ from 'lodash';
import moment from 'moment'
import {userdata} from '../config/Firebase';
const Papa = require('papaparse');

class AddTransaction extends Component {

    constructor(props) {

        super(props);
        this.state = {
            data: props.data,
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
        this.props.onUpdate(uniqueKey, this.state.fields)


    }


    deleteRow = (uniqueKey) => {

        const index = this.props.userdata.findIndex(d=>d.key === uniqueKey);
        const temp = this.props.userdata.slice();
        temp.splice(index, 1);
        this.setState({data: temp}, ()=>this.props.onDelete(uniqueKey))


    }
    handleChange = (args)=> {
        this.setState({fields: args.fields})


    }
    onSortByName = () => {
        const data = this.props.userdata.slice();
        const sortBy = this.state.sortByAsc ? 'asc' : 'desc';
        const sortedData = _.orderBy(data, 'payment', sortBy)
        this.setState({data: sortedData, sortByAsc: !this.state.sortByAsc})

    }

    onSortBy = (ref) => {
        const data = this.props.userdata.slice();
        const sortBy = this.state.sortByAsc ? 'asc' : 'desc';
        const sortedData = _.orderBy(data, ref, sortBy)
        this.setState({data: sortedData, sortByAsc: !this.state.sortByAsc})

    }


    save = ()=> {
        if (this.state.isEditMode) {
            const temp = this.props.userdata.slice();
            temp.splice(this.state.updateIndex, 1, this.state.fields)
            this.setState({data: temp, isDisableSaveButton: true})

        } else {

            this.props.onSave(this.state.fields)
        }


    }


    handleSelect = (args) => {
        this.setState({fields: args.fields})
    }


    isValidateItem = (isValid)=> {

        if (isValid) {
            this.setState({isDisableSaveButton: false})
        } else {
            this.setState({isDisableSaveButton: true})
        }
    }


    handleUpload = (evt)=> {

        console.log(evt.target.files)
        const that = this;
        that.userRef = userdata.child(this.props.userid);
        console.log(this.props.userid)
        const file = evt.target.files[0]

        // Read the file as text
        Papa.parse(file, {
            header: true,
            complete: function (d) {
                console.log(d, d.data[0])
                console.log(moment(d.data[0].Date).format('YYYY-DD-MM'))
                const formatted = d.data.map((item)=> {
                    const {date, payment, category, debit, credit} = item;
                    let newObj = {
                        date: moment(date).format('YYYY-MM-DD'),
                        payment,
                        debit: isNaN(parseFloat(debit)) ? '-' : parseFloat(debit),
                        credit: isNaN(parseFloat(credit)) ? '-' : parseFloat(credit)
                    };
                    if (item.category === 'BUSINESS - Other') {
                        newObj = {...newObj, category: {parent: 'business', child: 'lend'}}

                    } else if (item.category === 'Concerts/Plays') {
                        newObj = {...newObj, category: {parent: 'entertainment', child: 'concert'}}

                    }
                    else if (item.category === 'Groceries') {
                        newObj = {...newObj, category: {parent: 'food', child: 'groceries'}}

                    }
                    else if (item.category === 'FOOD - Other') {
                        newObj = {...newObj, category: {parent: 'food', child: 'alcohol'}}

                    }
                    else if (item.category === 'Bus/Taxi/Train Fare') {
                        newObj = {...newObj, category: {parent: 'transportation', child: 'public'}}

                    }
                    else if (item.category === 'Education') {
                        newObj = {...newObj, category: {parent: 'dailyliving', child: 'education'}}

                    }
                    else if (item.category === 'Phone') {
                        newObj = {...newObj, category: {parent: 'utilities', child: 'phone'}}

                    }
                    else if (item.category === 'Wages & Tips') {
                        newObj = {...newObj, category: {parent: 'income', child: 'salary'}}

                    }

                    else if (item.category === 'Mortgage/Rent') {
                        newObj = {...newObj, category: {parent: 'housing', child: 'rent'}}

                    }
                    else if (item.category === 'Internet') {
                        newObj = {...newObj, category: {parent: 'utilities', child: 'internet'}}

                    }
                    else if (item.category === 'INCOME-Other') {
                        newObj = {...newObj, category: {parent: 'income', child: 'freelance'}}

                    }
                    else if (item.category === 'SAVINGS -Other') {
                        newObj = {...newObj, category: {parent: 'savings', child: 'investments'}}

                    }
                    else if (item.category === 'Personal Supplies') {
                        newObj = {...newObj, category: {parent: 'dailyliving', child: 'personal'}}

                    }
                    else if (item.category === 'Clothing') {
                        newObj = {...newObj, category: {parent: 'dailyliving', child: 'clothing'}}

                    }
                    else if (item.category === 'Dining/Eating Out') {
                        newObj = {...newObj, category: {parent: 'food', child: 'eatingoutside'}}

                    }
                    else if (item.category === "UTILITIES - Other") {
                        newObj = {...newObj, category: {parent: 'utilities', child: 'other'}}

                    }
                    else if (item.category === "MISC - Other") {
                        newObj = {...newObj, category: {parent: 'miscellaneous', child: 'other'}}

                    }
                    else if (item.category === "Medicine/Drugs") {
                        newObj = {...newObj, category: {parent: 'health', child: 'medicine'}}

                    }
                    else if (item.category === "Movies/Theater") {
                        newObj = {...newObj, category: {parent: 'entertainment', child: 'movies'}}

                    }
                    else if (item.category === "Refunds/Reimbursements") {
                        newObj = {...newObj, category: {parent: 'income', child: 'refunds'}}

                    }
                    else if (item.category === "Vacation/Travel") {
                        newObj = {...newObj, category: {parent: 'entertainment', child: 'vacation'}}

                    }
                    else if (item.category === "Gifts") {
                        newObj = {...newObj, category: {parent: 'income', child: 'gifts'}}

                    }
                    else if (item.category === "Gas/Oil") {
                        newObj = {...newObj, category: {parent: 'utilities', child: 'gas'}}

                    }
                    else if (item.category === "Laundry / Dry Cleaning") {
                        newObj = {...newObj, category: {parent: 'dailyliving', child: 'laundry'}}

                    }
                    else if (item.category === "Financial Aid") {
                        newObj = {...newObj, category: {parent: 'income', child: 'financialAid'}}

                    }
                    else if (item.category === "phone") {
                        newObj = {...newObj, category: {parent: 'utilities', child: 'phone'}}

                    }
                    else if (item.category === "Cleaning Services") {
                        newObj = {...newObj, category: {parent: 'dailyliving', child: 'cleaning'}}

                    }
                    else if (item.category === "FoOD - Other") {
                        newObj = {...newObj, category: {parent: 'food', child: 'alcohol'}}

                    }
                    else if (item.category === "wages & Tips") {
                        newObj = {...newObj, category: {parent: 'income', child: 'salary'}}

                    }
                    else if (item.category === "InCOME-Other") {
                        newObj = {...newObj, category: {parent: 'income', child: 'freelance'}}

                    }
                    else if (item.category === "Gifts Received") {
                        newObj = {...newObj, category: {parent: 'income', child: 'gifts'}}

                    } else {
                        newObj = {...newObj, category: {parent: 'miscellaneous', child: 'other'}}

                    }

                    return newObj;
                    // console.log(newObj)


                })

                // console.log(formatted)
                // formatted.forEach(function (e, i) {
                //     const temp = that.userRef.push();
                //     // console.log(temp.key,i)
                //     temp.set(e)
                //     //   console.log(temp.key,i,'after')
                // })


            }
        })


    }

    render() {
        if (!this.props.userdata) return <div></div>;
        return (<Grid fluid={true}>
                <Header onSortBy={this.onSortBy}/>
                {this.props.userdata.map((data, index)=>
                    <Transaction data={data}
                                 onDeleteRow={this.deleteRow}
                                 onChange={this.handleChange}
                                 onEdit={this.editRow}
                                 uniqueKey={data.key}
                                 onSelect={this.handleSelect}
                                 id={index}
                                 key={data.key}
                                 isValidItem={this.isValidateItem}

                    />)}
                <AddItem onChange={this.handleChange} onSelect={this.handleSelect}
                         isValidItem={this.isValidateItem}/>

                <Row className="saveRow">
                    {/*<Col md={4} className="saveCol">*/}
                    {/*<input type="file" id="files" name="files[]" multiple onChange={this.handleUpload}/>*/}
                    {/*<output id="list"></output>*/}
                    {/*</Col>*/}

                    {/*<Col md={2} className="saveCol">*/}
                    {/*<Button bsStyle="primary" className="saveButton"*/}
                    {/*onClick={this.save}>Upload</Button>*/}
                    {/*</Col>*/}

                    <Col md={2} className="saveCol">
                        <Button bsStyle="primary" className="saveButton" disabled={this.state.isDisableSaveButton}
                                onClick={this.save}>Save</Button>
                    </Col>

                </Row>

            </Grid>
        )
    }

}


function mapStateToProps({user}) {
    if (!user) return {};
    const {userdata, userid} = user
    return {
        userdata, userid
    }

}

export default connect(mapStateToProps, null)(AddTransaction)