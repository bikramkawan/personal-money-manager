/**
 * Created by bikramkawan on 10/9/17.
 */
import React from 'react';
import {Nav, NavItem, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import endpoints from '../../shared/endpoints'
import FilterData from '../Dashboard/FilterData'

const ReportSubNavBar = () => {

    return ( <Navbar className="report-Nav">
        <Nav>
            <NavItem><Link to={endpoints.income}>Income</Link></NavItem>
            <NavItem><Link to={endpoints.expense}>Expense</Link></NavItem>
            <FilterData/>
        </Nav>


    </Navbar>)

}

export default ReportSubNavBar;