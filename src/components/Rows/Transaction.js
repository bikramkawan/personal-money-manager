/**
 * Created by bikramkawan on 8/11/17.
 */
import React, {Component} from 'react';
import InputBox from '../InputBox/InputBox';
import {connect} from 'react-redux'
import {Glyphicon, Row, Col, Button} from 'react-bootstrap';
import {Grid, FormGroup, Form, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import SelectBox from '../SelectBox/SelectBox'
import * as _ from 'lodash';
import categories from '../../shared/utils'
import ReactDOM from 'react-dom';
const mapStateToProps = state => {
    console.log(state)
    return {...state}
}

class Transaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
            value: '',
            ref: '',
            payment: this.props.data.payment || '',
            category: this.props.data.category || '',
            debit: this.props.data.debit || '',
            credit: this.props.data.credit || '',
            date: this.props.data.date || '',
        }



    }


    delete = (uniqueKey) => {

        this.props.onDeleteRow(uniqueKey);
    }
    handleChange = (ref, e)=> {
        const val = e.target.value;
        this.isValidAll();
        this.setState({ref: ref, [ref]: val}, ()=>this.props.onChange({
            ref: ref,
            value: val,
            uniqueKey: this.props.uniqueKey
        }))


    }

    editMe = (uniqueKey) => {

        this.setState({isEditMode: true}, ()=>this.props.onEdit(uniqueKey))
    }

    update = (uniqueKey) => {

        this.setState({isEditMode: false}, ()=>this.props.onEdit(uniqueKey))
    }

    validatePayment() {
        const length = this.state.payment.length;
        if (length < 1) return;

        return (length > 6) ? 'success' : 'error';

    }

    validateDate() {
        if (this.state.date.length < 1) return;
        const date = this.state.date.split('.');
        let checkLength;
        if (date.length === 3 && date[0].length === 2 && date[1].length === 2 && date[2].length === 4) {
            checkLength = true
        } else {
            checkLength = false
        }
        if (checkLength) {

            return 'success'
        }

        else if (!checkLength) return 'error';

    }

    validateIsNumber(val) {
        if (val < 1) return;
        return _.isFinite(parseFloat(val)) ? 'success' : 'error';

    }

    isValidAll() {
        const isDate = (this.validateDate() === 'success');
        const isPayment = (this.validatePayment() === 'success');
        const isDebit = (this.validateIsNumber(this.state.debit) === 'success');
        const isCredit = (this.validateIsNumber(this.state.credit) === 'success');

        if (isCredit && isDebit && isPayment && isDate) {
            this.props.isValidItem(true)
        } else {
            this.props.isValidItem(false);
        }


    }


    toggleDateRender(ref, value) {
        if (this.state.isEditMode) {
            return <FormGroup
                className='itemValidation'
                controlId="date"
                validationState={this.validateDate()}>
                <FormControl
                    type="text"
                    ref='date'
                    value={this.state.date}
                    placeholder="Enter date"
                    onChange={this.handleChange.bind(this, 'date')}/>
                <ControlLabel srOnly={this.state.ref !== 'date'}>Date is invalid</ControlLabel>
            </FormGroup>

        }
        return value;

    }

    togglePaymentRender(ref, value) {
        if (this.state.isEditMode) {

            return <FormGroup
                className='itemValidation'
                controlId="payment"
                validationState={this.validatePayment()}>
                <FormControl
                    type="text"
                    ref='payment'
                    value={this.state.payment}
                    placeholder="Short payment description"
                    onChange={this.handleChange.bind(this, 'payment')}/>
                <ControlLabel srOnly={this.state.ref !== 'payment'}>Payment description is short</ControlLabel>
            </FormGroup>

        }
        return value;

    }


    toggleCategoryRender(ref, value) {
        if (this.state.isEditMode) {
            return <SelectBox ref='category' menuItems={_.keys(categories)}
                              onSelect={this.handleChange.bind(this, 'category')}/>
        }
        return value;

    }

    toggleCreditRender(ref, value) {
        if (this.state.isEditMode) {
            return <FormGroup
                className='itemValidation'
                controlId="credit"
                validationState={this.validateIsNumber(this.state.credit)}>
                <FormControl
                    type="text"
                    ref='credit'
                    placeholder="Enter credit amount"
                    value={this.state.credit}
                    onChange={this.handleChange.bind(this, 'credit')}/>
                <ControlLabel srOnly={this.state.ref !== 'credit'}>Credit is invalid</ControlLabel>
            </FormGroup>

        }
        return value;

    }

    toggleDebitRender(ref, value) {
        if (this.state.isEditMode) {
            return <FormGroup
                className='itemValidation'
                controlId="debit"
                validationState={this.validateIsNumber(this.state.debit)}>
                <FormControl
                    type="text"
                    ref='debit'
                    value={this.state.debit}
                    placeholder="Enter debit amount"
                    onChange={this.handleChange.bind(this, 'debit')}/>
                <ControlLabel srOnly={this.state.ref !== 'debit'}>Debit is invalid</ControlLabel>
            </FormGroup>

        }
        return value;

    }


    // componentWillReceiveProps() {
    //
    //     this.setState({isEditMode: false})
    // }

    render() {

        return (
            <Row data-id={this.props.id}>
                <Col md={1}>{this.props.id}</Col>
                <Col md={2}>{this.toggleDateRender('date', this.state.date)}</Col>
                <Col md={3}>{this.togglePaymentRender('payment', this.state.payment)}</Col>
                <Col md={2}
                     className="text-capitalize">{this.toggleCategoryRender('category', this.state.category)}</Col>
                <Col md={1}>{this.toggleDebitRender('debit', this.state.debit)}</Col>
                <Col md={1}>{this.toggleCreditRender('credit', this.state.credit)}</Col>
                <Col md={1}>
                    {!this.state.isEditMode ? <Button onClick={this.editMe.bind(this, this.props.uniqueKey)}><Glyphicon
                        glyph="glyphicon glyphicon-edit"/></Button> :
                        <Button onClick={this.update.bind(this, this.props.uniqueKey)}><Glyphicon
                            glyph="glyphicon glyphicon-ok"/></Button>
                    }

                </Col>
                <Col md={1}>
                    <Button onClick={this.delete.bind(this, this.props.uniqueKey)}>
                        <Glyphicon glyph="glyphicon glyphicon-trash"/></Button>


                </Col>

            </Row>
        )

    }


}
export default Transaction;