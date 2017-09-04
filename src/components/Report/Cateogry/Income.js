/**
 * Created by bikramkawan on 8/15/17.
 */
import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap'

export default class Income extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<Grid className="grid makeTable Income">
            <Row className='header'>
                <Col md={6}>Income</Col>
                <Col md={2}>Budget</Col>
                <Col md={2}>Actual</Col>
                <Col md={2}>Difference</Col>
            </Row>
            <Row className='title'>
                <Col md={6}>Salary</Col>
                <Col md={2}>0.0</Col>

            </Row>
            <Row className='title'>
                <Col md={6}>Freelance</Col>
                <Col md={2}>0.0</Col>
                <Col md={2}>0</Col>
                <Col md={2}>0</Col>
            </Row>
            <Row className='title'>
                <Col md={6}>Gifts Received</Col>
                <Col md={2}>0.0</Col>
                <Col md={2}>0.0</Col>
                <Col md={2}>0.0</Col>
            </Row>
            <Row className='title'>
                <Col md={6}>Income Other</Col>
                <Col md={2}>0.0</Col>
                <Col md={2}>0.0</Col>
                <Col md={2}>0.0</Col>
            </Row>
            <Row className='total'>
                <Col md={6}>Total Income</Col>
                <Col md={2}>0.0</Col>

            </Row>
        </Grid>)
    }

}