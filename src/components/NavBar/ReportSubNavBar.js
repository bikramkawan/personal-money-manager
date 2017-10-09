/**
 * Created by bikramkawan on 10/9/17.
 */
import React, {Component} from 'react';
import {Nav, NavItem, Navbar} from 'react-bootstrap';
import {Link, Route} from 'react-router-dom';
const ReportSubNavBar = () => {

    return ( <Navbar>
        <Nav>
            <NavItem><Link to="/app/transactions/report/income">Income</Link></NavItem>
            <NavItem><Link to="/app/transactions/report/expense">Expense</Link></NavItem>
        </Nav>
    </Navbar>)

}

export default ReportSubNavBar;