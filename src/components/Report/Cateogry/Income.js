/**
 * Created by bikramkawan on 8/15/17.
 */
import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import {userData} from '../../../actions';
import {Nav, NavItem, Navbar} from 'react-bootstrap';
import {Link, Route} from 'react-router-dom';

 class Income extends Component {
    render() {
        console.log(this.props)
        if(!this.props.userdata) return <div></div>;
        return (

            <div style={{overflow: 'hidden'}}>
                <Navbar>
                    <Nav>
                        <NavItem><Link to="/app/transaction/report/income">Income</Link></NavItem>
                        <NavItem><Link to="/app/transaction/report/expense">Expense</Link></NavItem>
                    </Nav>
                </Navbar>


            <Grid className="grid makeTable Income">
            <Row className='header'>
                <Col md={6}>Income</Col>
                <Col md={2}>Budget</Col>
                <Col md={2}>Actual</Col>
                <Col md={2}>Difference</Col>
            </Row>
            <Row className='title'>
                <Col md={6}>Salary</Col>
                <Col md={2}>0.0</Col>
                <Col md={2}>{0}</Col>
                <Col md={2}>{0}</Col>
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
                <Col md={2}>{0}</Col>
                <Col md={2}>{'0'}</Col>
            </Row>
        </Grid>
            </div>)
    }

}

function mapStateToProps({user}) {
    console.log(user)
    if(!user) return ;
    const {userdata} = user
    return {
        userdata
    }

}

export default connect(mapStateToProps,{userData})(Income)