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

const mapStateToProps = state => {
    return {...state}
}

class Transaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false, value: ''
        }
        this.store = this.props.store;

    }


    delete = (uniqueKey) => {

        this.props.onDeleteRow(uniqueKey);
    }
    handleChange = (ref, args)=> {

        this.props.onChange({ref: ref, value: args, uniqueKey: this.props.uniqueKey})

    }

    editMe = (uniqueKey) => {

        this.setState({isEditMode: true}, ()=>this.props.onEdit(uniqueKey))
    }

    getValidationState() {
        const length = this.state.value.length;
        console.log(length)
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }

    toggleRender(ref, value) {
        if (this.state.isEditMode) {

            if (ref === 'category') {

                return <SelectBox ref='category' menuItems={_.keys(categories)}
                                  onSelect={this.handleChange.bind(this, 'category')}/>
            }

            // return <InputBox
            //     ref={ref}
            //     placeholder="Enter #.."
            //     value={value}
            //     onChange={this.handleChange.bind(this, ref)}
            // />

            return <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationState()}>
                <ControlLabel>Working example with validation</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Enter text"
                    onChange={this.handleChange.bind(this, ref)}/>
            </FormGroup>

        }
        return value;

    }

    componentWillReceiveProps() {

        this.setState({isEditMode: false})
    }

    render() {

        return (
            <Row data-id={this.props.id}>
                <Col md={1}>{this.props.id}</Col>
                <Col md={2}>{this.toggleRender('date', this.props.data.date)}</Col>
                <Col md={3}>{this.toggleRender('payment', this.props.data.payment)}</Col>
                <Col md={2} className="text-capitalize">{this.toggleRender('category', this.props.data.category)}</Col>
                <Col md={1}>{this.toggleRender('debit', this.props.data.debit)}</Col>
                <Col md={1}>{this.toggleRender('credit', this.props.data.credit)}</Col>
                <Col md={1}>
                    <Button onClick={this.editMe.bind(this, this.props.uniqueKey)}><Glyphicon
                        glyph="glyphicon glyphicon-edit"/></Button>

                </Col>
                <Col md={1}>
                    <Button onClick={this.delete.bind(this, this.props.uniqueKey)}>
                        <Glyphicon glyph="glyphicon glyphicon-trash"/></Button>


                </Col>

            </Row>
        )

    }


}
export default connect(mapStateToProps)(Transaction);