/**
 * Created by bikramkawan on 8/15/17.
 */
import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap'
import * as _ from 'lodash';
import {connect} from 'react-redux'
import {userData} from '../../../actions';
import {Nav, NavItem, Navbar} from 'react-bootstrap';
import {Link, Route} from 'react-router-dom';

const expensesCat = {rent: 'rent', transportation: 'transportation', utilities: 'utilities', groceries: 'groceries'};


class Expense extends Component {

    prepareData() {

        const filterByExpense = this.props.userdata.filter(d=>d.credit > 0);
            const rent = _.sumBy(filterByExpense, (d)=> {
            if (d.category === expensesCat.rent) return d.credit
        });
        const transportation = _.sumBy(filterByExpense, (d)=> {
            if (d.category === expensesCat.transportation) return d.credit
        });
        const utilities = _.sumBy(filterByExpense, (d)=> {
            if (d.category === expensesCat.utilities) return d.credit
        });
        const groceries = _.sumBy(filterByExpense, (d)=> {
            if (d.category === expensesCat.groceries) return d.credit
        });

        const expenseByCat = {rent: rent, transportation: transportation, utilities: utilities, groceries: groceries}

        return expenseByCat;
    }

    render() {
        if(!this.props.userdata) return <div></div>;
        const expenseByCat = this.prepareData();
        console.log(expenseByCat)
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
                <Col md={6}>Expenses</Col>
                <Col md={2}>Budget</Col>
                <Col md={2}>Actual</Col>
                <Col md={2}>Difference</Col>
            </Row>
            <Row className='title'>
                <Col md={6}>Rent</Col>
                <Col md={2}>0.0</Col>
                <Col md={2}>{expenseByCat.rent}</Col>
                <Col md={2}>{expenseByCat.rent}</Col>
            </Row>
            <Row className='title'>
                <Col md={6}>Transportation</Col>
                <Col md={2}>0.0</Col>
                <Col md={2}>{expenseByCat.transportation}</Col>
                <Col md={2}>{expenseByCat.transportation}</Col>
            </Row>
            <Row className='title'>
                <Col md={6}>Groceries</Col>
                <Col md={2}>0.0</Col>
                <Col md={2}>{expenseByCat.groceries}</Col>
                <Col md={2}>{expenseByCat.groceries}</Col>
            </Row>
            <Row className='title'>
                <Col md={6}>Utilities</Col>
                <Col md={2}>0.0</Col>
                <Col md={2}>{expenseByCat.utilities}</Col>
                <Col md={2}>{expenseByCat.utilities}</Col>
            </Row>
            <Row className='total'>
                <Col md={6}>Total Expense</Col>
                <Col md={2}>0.0</Col>
                <Col md={2}>{this.props.totalCredit}</Col>
                <Col md={2}>{this.props.totalCredit}</Col>
            </Row>
        </Grid>
            </div>)
    }

}


function mapStateToProps({user}) {
    if(!user) return ;
    const {userdata} = user
    return {
        userdata
    }

}

export default connect(mapStateToProps,{userData})(Expense)