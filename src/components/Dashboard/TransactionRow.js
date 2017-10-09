/**
 * Created by bikramkawan on 8/11/17.
 */
import React, {Component} from 'react';
import {Glyphicon, Row, Col, Button} from 'react-bootstrap';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import * as _ from 'lodash';
import moment from 'moment'
import categories from '../../shared/utils'

class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
            value: '',
            ref: '',
            fields: {
                payment: this.props.data.payment || '',
                category: this.props.data.category || '',
                debit: this.props.data.debit || '',
                credit: this.props.data.credit || '',
                date: this.props.data.date || '',
            },
            invalidDebitCredit: false
        }


    }


    delete = (uniqueKey) => {

        this.props.onDeleteRow(uniqueKey);
    }
    handleChange = (ref, e)=> {

        let val = e.target.value;
        let {fields} = this.state;

        if (ref === 'credit' || ref === 'debit') {
            const parsedVal = parseFloat(val);
            val = _.isNaN(parsedVal) ? '-' : parsedVal;
        }
        if (ref === 'date') {

            val = moment(val).format('X')
        }

        fields = {...fields, [ref]: val};

        this.isValidAll(fields);
        this.setState({ref: ref, fields}, ()=>this.props.onChange({
            fields,
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
        const length = this.state.fields.payment.length;
        if (length < 1) return;

        return (length > 6) ? 'success' : 'error';

    }

    // validateDate() {
    //     if (this.state.fields.date.length < 1) return;
    //     const date = this.state.fields.date.split('.');
    //     let checkLength;
    //     if (date.length === 3 && date[0].length === 2 && date[1].length === 2 && date[2].length === 4) {
    //         checkLength = true
    //     } else {
    //         checkLength = false
    //     }
    //     if (checkLength) {
    //
    //         return 'success'
    //     }
    //
    //     else if (!checkLength) return 'error';
    //
    // }

    validateIsNumber(val) {
        if (val < 1) return;
        return _.isFinite(parseFloat(val)) ? 'success' : 'error';

    }

    isValidAll(fields) {
        const isPayment = (this.validatePayment(fields.payment) === 'success');
        const isDebit = (this.validateIsNumber(fields.debit) === 'success');
        const isCredit = (this.validateIsNumber(fields.credit) === 'success');
        const isDate = _.isEmpty(fields.date)

        this.setState({invalidDebitCredit: (isCredit && isDebit)})
        console.log(this.state, fields)
        this.setState({invalidDebitCredit: (isCredit && isDebit)})
        if (!(isCredit && isDebit) && isPayment && (isDebit || isCredit) && !isDate) {
            this.props.isValidItem(true)
        } else {
            this.props.isValidItem(false);
        }


    }


    toggleDateRender(ref, value) {
        if (this.state.isEditMode) {
            return <FormGroup>
                <input
                    className="form-control"
                    type="date"
                    style={{padding: '0'}}
                    value={value}
                    onChange={this.handleChange.bind(this, 'date')}/>
            </FormGroup>

        }
        return moment.unix(value).format('YYYY-MM-DD');

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
                    value={this.state.fields.payment}
                    placeholder="Short payment description"
                    onChange={this.handleChange.bind(this, 'payment')}/>
                <ControlLabel
                    className="onFocus Payment"
                    srOnly={this.state.ref !== 'payment'}>
                    {this.validatePayment() === 'success' ?
                        <Glyphicon glyph="glyphicon glyphicon-ok"/> :
                        <Glyphicon glyph="glyphicon glyphicon-remove"/>} Payment description is
                    valid</ControlLabel>
            </FormGroup>

        }
        return value;

    }

    handleSelect = ({target}) => {
        const child = target.value;
        const parent = target[target.selectedIndex].id;
        let {fields} = this.state;
        fields = {...fields, category: {parent, child}};
        this.setState({fields}, ()=>this.props.onSelect({
            fields,
            uniqueKey: this.props.uniqueKey
        }))

    }

    renderOptions(d) {
        const values = _.keys(categories[d]);
        return <optgroup label={d} key={d}>
            {values.map((value, main)=><option key={main} id={d} value={value}>{value}</option>)}
        </optgroup>

    }

    toggleCategoryRender(ref, value) {
        if (this.state.isEditMode) {
            return <select className="form-control" id="sel1" onChange={this.handleSelect}
                           style={{textTransform: 'Capitalize'}}>
                {_.keys(categories).map(d=>this.renderOptions(d))}
            </select>
        }
        return value.child || value.parent || '';

    }

    toggleCreditRender(ref, value) {
        if (this.state.isEditMode) {
            return <FormGroup
                className='itemValidation'
                controlId="credit"
                validationState={this.validateIsNumber(this.state.fields.credit)}>
                <FormControl
                    type="text"
                    ref='credit'
                    placeholder="Enter credit amount"
                    value={this.state.fields.credit}
                    onChange={this.handleChange.bind(this, 'credit')}/>
                <ControlLabel
                    className="onFocus"
                    srOnly={this.state.ref !== 'credit'}> {this.validateIsNumber(this.state.fields.credit) === 'success' ?
                    <Glyphicon glyph="glyphicon glyphicon-ok"/> :
                    <Glyphicon glyph="glyphicon glyphicon-remove"/>}
                    Credit is valid</ControlLabel>
            </FormGroup>

        }
        return value;

    }

    toggleDebitRender(ref, value) {
        if (this.state.isEditMode) {
            console.log(this.state.fields.debit, value)
            return <FormGroup
                className='itemValidation'
                controlId="debit"
                validationState={this.validateIsNumber(this.state.fields.debit)}>
                <FormControl
                    type="text"
                    ref='debit'
                    value={this.state.fields.debit}
                    placeholder="Enter debit amount"
                    onChange={this.handleChange.bind(this, 'debit')}/>
                <ControlLabel
                    className="onFocus"
                    srOnly={this.state.ref !== 'debit'}>{this.validateIsNumber(this.state.fields.debit) === 'success' ?
                    <Glyphicon glyph="glyphicon glyphicon-ok"/> :
                    <Glyphicon glyph="glyphicon glyphicon-remove"/>} Debit is valid</ControlLabel>
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
                <Col md={2}>{this.toggleDateRender('date', this.state.fields.date)}</Col>
                <Col md={3}>{this.togglePaymentRender('payment', this.state.fields.payment)}</Col>
                <Col md={2}
                     className="text-capitalize">{this.toggleCategoryRender('category', this.state.fields.category)}</Col>
                <Col md={1}>{this.toggleDebitRender('debit', this.state.fields.debit)}</Col>
                <Col md={1}>{this.toggleCreditRender('credit', this.state.fields.credit)}</Col>
                <Col md={1}>
                    {!this.state.isEditMode ? <Button onClick={this.editMe.bind(this, this.props.uniqueKey)}><Glyphicon
                        glyph="glyphicon glyphicon-edit"/></Button> :
                        <Button disabled={this.state.invalidDebitCredit}
                                onClick={this.update.bind(this, this.props.uniqueKey)}><Glyphicon
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