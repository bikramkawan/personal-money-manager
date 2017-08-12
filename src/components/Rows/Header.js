/**
 * Created by bikramkawan on 8/11/17.
 */
import React, {Component} from 'react'
import {Row, Col} from 'react-bootstrap';

class Header extends Component {

    render() {

        return (
            <Row>
                <Col md={1} className="heading">#</Col>
                <Col md={2} className="heading">Date</Col>
                <Col md={3} className="heading">Payment Description</Col>
                <Col md={2} className="heading">Category</Col>
                <Col md={1} className="heading">Debit</Col>
                <Col md={1} className="heading">Credit</Col>
            </Row>
        )

    }

}

export default Header