/**
 * Created by bikramkawan on 8/11/17.
 */
import React, {Component} from 'react';

import {Row, Col} from 'react-bootstrap';
import {FormGroup, FormControl, ControlLabel, Glyphicon} from 'react-bootstrap';
import * as _ from 'lodash';
import moment from 'moment';
import categories from '../../shared/utils'


export default class AddItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ref: '',
            value: '',
            payment: '',
            category: '',
            debit: '',
            credit: '',
            date: '',
            isValidDate: false,
            isValidPayment: false,
            invalidDebitCredit: false,
            isValidNumber: false,
            isValidCategory: false,

        }
        this.delayOnChange = _.debounce(this.delayOnChange, 150);
    }


    handleChange = (ref, e)=> {
        this.delayOnChange(ref, e.target.value);


    }

    delayOnChange(ref, value) {
        this.setState({[ref]: value, ref})
        this.isValidAll(ref)

    }

    handleSelect = ({target}) => {
        const child = target.value;
        const parent = target[target.selectedIndex].id;
        this.delayOnChange('category', {parent, child})
        this.isValidAll('category')

    }

    validatePayment() {
        const {payment} = this.state;
        const isValid = (payment && payment.length > 6);
        this.setState({isValidPayment: isValid});


    }


    validateIsNumber(ref) {

        if (ref === 'debit') {
            const {debit} = this.state;
            const isValid = (debit && !isNaN(debit));
            this.setState({isValidNumber: isValid || false, credit: ''})
            //  return isValid;
        }
        if (ref === 'credit') {
            const {credit} = this.state;
            const isValid = (credit && !isNaN(credit));
            this.setState({isValidNumber: isValid || false, debit: ''})

        }


    }

    validateDate(ref) {

        const isValid = !_.isEmpty(this.state.date)
        this.setState({isValidDate: isValid})


    }


    validateCategory(ref) {

        const isValid = !_.isEmpty(this.state.category)
        this.setState({isValidCategory: isValid})
        return isValid;


    }

    parseValues() {

        const {date, debit, credit, category, payment} = this.state;

        const fields = {
            date: moment(date).format('X'),
            debit: !isNaN(parseFloat(debit)) ? parseFloat(debit) : debit,
            credit: !isNaN(parseFloat(credit)) ? parseFloat(credit) : credit,
            category,
            payment
        }

        return fields

    }

    isValidAll(ref) {


        this.validatePayment();
        this.validateIsNumber(ref);
        this.validateDate(ref);
        this.validateCategory(ref);
        const {isValidNumber, isValidDate, isValidCategory, isValidPayment} = this.state;
        const fields = this.parseValues();
        if (isValidDate && isValidPayment && isValidNumber && isValidCategory) {
            this.props.isValidItem(true)
            this.props.onChange({fields, uniqueKey: this.props.uniqueKey})
        } else {
            this.props.isValidItem(false);
        }


    }


    renderOptions(d) {

        const values = _.keys(categories[d]);
        return <optgroup label={d} key={d}>
            {values.map((value, main)=><option key={main} id={d} value={value}>{value}</option>)}
        </optgroup>

    }


    render() {

        return (
            <Row>

                <Col md={1}>
                    {/*<InputBox*/}
                    {/*ref='id'*/}
                    {/*placeholder="Enter #.."*/}
                    {/*onChange={this.handleChange.bind(this, 'id')}/>*/}
                </Col>
                <Col md={2}>
                    {/*<InputBox*/}
                    {/*ref='date'*/}
                    {/*placeholder="Enter date.."*/}
                    {/*onChange={this.handleChange.bind(this, 'date')}/>*/}
                    <FormGroup>
                        <input
                            className="form-control"
                            type="date"
                            style={{padding: '0'}}
                            onChange={this.handleChange.bind(this, 'date')}/>
                    </FormGroup>


                </Col>
                <Col md={3}>
                    <FormGroup
                        className='itemValidation'
                        controlId="payment"
                        validationState={this.state.isValidPayment ? 'success' : 'error'}>
                        <FormControl
                            type="text"
                            ref='payment'
                            placeholder="Short payment description"
                            onChange={this.handleChange.bind(this, 'payment')}/>
                        <ControlLabel
                            className="onFocus Payment"
                            srOnly={this.state.ref !== 'payment'}>
                            {this.state.isValidPayment ? <Glyphicon glyph="glyphicon glyphicon-ok"/> :
                                <Glyphicon glyph="glyphicon glyphicon-remove"/>} Payment description is
                            valid </ControlLabel>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    {/*<SelectBox ref='category' menuItems={_.keys(categories)}*/}
                    {/*onSelect={this.handleSelect}/>*/}
                    <select className="form-control" id="sel1" onChange={this.handleSelect}
                            style={{textTransform: 'Capitalize'}}>
                        {_.keys(categories).map(d=>this.renderOptions(d))}
                    </select>

                </Col>
                <Col md={1}>
                    <FormGroup
                        className='itemValidation'
                        controlId="debit"
                        validationState={this.state.isValidNumber ? 'success' : 'error'}>
                        <FormControl
                            type="text"
                            ref='debit'
                            placeholder="Enter debit amount"
                            value={this.state.debit}
                            onChange={this.handleChange.bind(this, 'debit')}/>
                        <ControlLabel
                            className="onFocus"
                            srOnly={this.state.ref !== 'debit'}>
                            {this.state.isValidNumber ?
                                <Glyphicon glyph="glyphicon glyphicon-ok"/> :
                                <Glyphicon glyph="glyphicon glyphicon-remove"/>} Debit is valid</ControlLabel>
                    </FormGroup>

                </Col>
                <Col md={1}>
                    <FormGroup
                        className='itemValidation'
                        controlId="credit"
                        validationState={this.state.isValidNumber ? 'success' : 'error'}>
                        <FormControl
                            type="text"
                            ref='credit'
                            placeholder="Enter credit amount"
                            value={this.state.credit}
                            onChange={this.handleChange.bind(this, 'credit')}/>
                        <ControlLabel
                            className="onFocus"
                            srOnly={this.state.ref !== 'credit'}>
                            {this.state.isValidNumber ?
                                <Glyphicon glyph="glyphicon glyphicon-ok"/> :
                                <Glyphicon glyph="glyphicon glyphicon-remove"/>}
                            Credit is valid</ControlLabel>
                    </FormGroup>
                </Col>

                <Col md={2}>
                    {this.state.isValidNumber &&
                    <span style={{fontSize: '12px'}}>Input Either Credit or Debit</span>}
                </Col>

            </Row>

        )
    }


}

