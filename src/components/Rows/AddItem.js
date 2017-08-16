/**
 * Created by bikramkawan on 8/11/17.
 */
import React, {Component} from 'react';
import InputBox from '../InputBox/InputBox';
import {Row, Col} from 'react-bootstrap';
export default class AddItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ref: '',
            value: ''
        }
    }


    handleChange = (ref, args)=> {
        this.setState({ref: ref, value: args}, ()=> this.props.onChange(this.state))

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
                    <InputBox
                        ref='date'
                        placeholder="Enter date.."
                        onChange={this.handleChange.bind(this, 'date')}/></Col>
                <Col md={3}>
                    <InputBox
                        ref='payment'
                        placeholder="Enter description.."
                        onChange={this.handleChange.bind(this, 'payment')}/>
                </Col>
                <Col md={2}>
                    <InputBox
                        ref='category'
                        placeholder="Enter cateogry.."
                        onChange={this.handleChange.bind(this, 'category')}/>
                </Col>
                <Col md={1}>
                    <InputBox
                        ref='debit'
                        placeholder="Enter debit.."
                        onChange={this.handleChange.bind(this, 'debit')}/></Col>
                <Col md={1}>
                    <InputBox
                        ref='credit'
                        placeholder="Enter credit.."
                        onChange={this.handleChange.bind(this, 'credit')}/>
                </Col>
            </Row>

        )
    }


}