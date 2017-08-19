/**
 * Created by bikramkawan on 8/11/17.
 */
import React, {Component} from 'react';
import SelectBox from '../SelectBox/SelectBox'
import {Glyphicon, Row, Col, Button} from 'react-bootstrap';
import {Grid, FormGroup, Form, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import * as _ from 'lodash';
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
            date: ''

        }
    }


    handleChange = (ref, e)=> {
        const val = e.target.value;
        this.setState({ref: ref, [ref]: val}, ()=>this.props.onChange({ref: ref, value: val}))

    }

    handleSelect = (categoryName) => {
        this.props.onSelect(categoryName)
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
        if (checkLength) return 'success';
        else if (!checkLength) return 'error';

    }

    validateIsNumber(val) {
        if (val < 1) return;
        return _.isFinite(parseFloat(val)) ? 'success' : 'error';

    }


    render() {
        console.log(this.state)
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
                    <FormGroup
                        className='itemValidation'
                        controlId="formBasicText"
                        validationState={this.validateDate()}>
                        <FormControl
                            type="text"
                            ref='date'
                            placeholder="Enter text"
                            onChange={this.handleChange.bind(this, 'date')}/>
                        <ControlLabel>Date is invalid</ControlLabel>
                    </FormGroup>


                </Col>
                <Col md={3}>
                    <FormGroup
                        className='itemValidation'
                        controlId="formBasicText"
                        validationState={this.validatePayment()}>
                        <FormControl
                            type="text"
                            ref='payment'
                            placeholder="Enter text"
                            onChange={this.handleChange.bind(this, 'payment')}/>
                        <ControlLabel>Payment description is short</ControlLabel>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <SelectBox ref='category' menuItems={_.keys(categories)}
                               onSelect={this.handleSelect}/>
                </Col>
                <Col md={1}>
                    <FormGroup
                        className='itemValidation'
                        controlId="formBasicText"
                        validationState={this.validateIsNumber(this.state.debit)}>
                        <FormControl
                            type="text"
                            ref='debit'
                            placeholder="Enter text"
                            onChange={this.handleChange.bind(this, 'debit')}/>
                        <ControlLabel>Debit is invalid</ControlLabel>
                    </FormGroup>

                </Col>
                <Col md={1}>
                    <FormGroup
                        className='itemValidation'
                        controlId="formBasicText"
                        validationState={this.validateIsNumber(this.state.credit)}>
                        <FormControl
                            type="text"
                            ref='credit'
                            placeholder="Enter text"
                            onChange={this.handleChange.bind(this, 'credit')}/>
                        <ControlLabel>Credit is invalid</ControlLabel>
                    </FormGroup>
                </Col>
            </Row>

        )
    }


}