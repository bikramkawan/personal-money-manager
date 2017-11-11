import React, {Component} from 'react';
import AddTransaction from './AddTransaction';
import {Grid, Row, Col, Button, Glyphicon} from 'react-bootstrap';
import Header from './Header'
import {userdata} from '../../config/Firebase';
import moment from 'moment'
const Papa = require('papaparse');
class DataInputDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
            isDisableSaveButton: true,
            openModal: false,
            uniqueKey: props.uniqueKey || '',
            csvdata: null,
            isUploading: false,
            isUploadSuccess: false
        }

    }

    handleChange = (args) => {

        this.props.onChange(args)


    }

    hideDialog = () => {
        this.props.hideDialog(false)
    }

    save = () => {

        this.props.onSave(this.state.uniqueKey)


    }

    isValidateItem = (isValid) => {

        if (isValid) {
            this.setState({isDisableSaveButton: false})
        } else {
            this.setState({isDisableSaveButton: true})
        }
    }


    handleUpload = (evt) => {
        const that = this;
        const file = evt.target.files[0]
        // Read the file as text
        Papa.parse(file, {
            header: true,
            complete: function (d) {
                const csvdata = d.data.map((item) => {
                    const {date, payment, debit, credit} = item;
                    let newObj = {
                        date: moment(date).format('X'),
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


                that.setState({csvdata})


            }
        })


    }

    upload = ()=> {
        if (!this.state.csvdata) return;
        this.setState({isUploading: true})
        const that = this;
        that.userRef = userdata.child(this.props.userid);
        this.state.csvdata.forEach((e, i)=> {
            const temp = that.userRef.push();
            temp.set(e).then(()=> {
                if (i === this.state.csvdata.length - 1) {
                    this.setState({isUploading: false, isUploadSuccess: true})
                }
            }).catch(e=>console.log(e))

        })


    }


    render() {
        return ((
            <Grid className="add-modal" fluid={true} style={{width: this.props.width}}>
                <Header className="add-modal-header"/>
                <Glyphicon onClick={this.hideDialog} className="close-modal"
                           glyph="glyphicon glyphicon-remove" bsSize={'large'}/>
                <AddTransaction onChange={this.handleChange}
                                isValidItem={this.isValidateItem}
                                data={this.props.data}
                />

                <Row className="saveRow">
                    <Col md={4} className="saveCol">
                        <input type="file" id="files" name="files[]" multiple onChange={this.handleUpload}/>
                        <output id="list"></output>
                    </Col>

                    {
                        this.state.isUploading &&
                        <Col md={2} className="saveCol">
                            <div className='loader'>
                            </div>
                        </Col>
                    }


                    {
                        this.state.isUploadSuccess && <Col md={2} className="saveCol">
                            <div className="alert alert-success">
                                <strong>Successfully Uploaded!</strong>
                            </div>

                        </Col>
                    }

                    <Col md={2} className="saveCol">
                        <Button bsStyle="primary" className="saveButton"
                                disabled={this.state.isUploading}
                                onClick={this.upload}> {this.state.isUploading ? 'Uploading...' : 'Upload'}</Button>
                    </Col>

                    <Col md={2} className="saveCol">
                        <Button bsStyle="primary" className="saveButton"
                                disabled={this.state.isDisableSaveButton}
                                onClick={this.save}>Save</Button>
                    </Col>

                </Row>
            </Grid>
        ))
    }


}

export default DataInputDialog


