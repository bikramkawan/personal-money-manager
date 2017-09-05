/**
 * Created by bikramkawan on 8/11/17.
 */
import React, {Component} from 'react';

import {Row, Col} from 'react-bootstrap';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import * as _ from 'lodash';
import categories from '../../shared/utils'


export default class AddItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ref: '',
            value: '',
            fields: {
                payment: '',
                category: '',
                debit: '',
                credit: '',
                date: '',
            },
            isValidDate: false,
            isValidPayment: false,

            isValidEntry: {
                isdate: false,
                payment: false,
                debit: false,
                credit: false,
            }

        }
    }


    handleChange = (ref, e)=> {

        let val = e.target.value;
        this.isValidAll();
        let {fields} = this.state;
        if (ref === 'credit' || ref === 'debit') {
            const parsedVal = parseFloat(val);
            val = _.isNaN(parsedVal) ? '' : parsedVal;

        }

        fields = {...fields, [ref]: val};
        this.setState({ref: ref, fields}, ()=>this.props.onChange({
            fields,
            uniqueKey: this.props.uniqueKey
        }))
        //  this.setState({ref: ref, [ref]: val}, ()=>this.props.onChange({ref: ref, value: val}))

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

    validatePayment() {
        const length = this.state.fields.payment.length;
        if (length < 1) return;

        return (length > 6) ? 'success' : 'error';

    }


    validateDate() {
        if (this.state.fields.date.length < 1) return;
        const date = this.state.fields.date.split('.');
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

        if (!_.isNumber(val)) return;
        return _.isFinite(parseFloat(val)) ? 'success' : 'error';

    }

    isValidAll() {
        // const isDate = (this.validateDate() === 'success');
        const isPayment = (this.validatePayment() === 'success');
        const isDebit = (this.validateIsNumber(this.state.fields.debit) === 'success');
        const isCredit = (this.validateIsNumber(this.state.fields.credit) === 'success');

        if ((isCredit || isDebit) && isPayment) {
            this.props.isValidItem(true)
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
                        validationState={this.validatePayment()}>
                        <FormControl
                            type="text"
                            ref='payment'
                            placeholder="Short payment description"
                            onChange={this.handleChange.bind(this, 'payment')}/>
                        <ControlLabel srOnly={this.state.ref !== 'payment'}>Payment description is short</ControlLabel>
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
                        validationState={this.validateIsNumber(this.state.fields.debit)}>
                        <FormControl
                            type="text"
                            ref='debit'
                            placeholder="Enter debit amount"
                            onChange={this.handleChange.bind(this, 'debit')}/>
                        <ControlLabel srOnly={this.state.ref !== 'debit'}>Debit is invalid</ControlLabel>
                    </FormGroup>

                </Col>
                <Col md={1}>
                    <FormGroup
                        className='itemValidation'
                        controlId="credit"
                        validationState={this.validateIsNumber(this.state.fields.credit)}>
                        <FormControl
                            type="text"
                            ref='credit'
                            placeholder="Enter credit amount"
                            onChange={this.handleChange.bind(this, 'credit')}/>
                        <ControlLabel srOnly={this.state.ref !== 'credit'}>Credit is invalid</ControlLabel>
                    </FormGroup>
                </Col>

            </Row>

        )
    }


}

