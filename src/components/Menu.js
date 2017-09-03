/**
 * Created by bikramkawan on 8/12/17.
 */
import React from 'react';
import {Link} from 'react-router-dom';
import {Nav, NavItem} from 'react-bootstrap';


const Menu = () => {
    return (
        <Nav bsStyle="pills">
            <NavItem >
                <Link to='/AddTransaction/'><h3>Add Transaction</h3></Link>
            </NavItem>
            <NavItem>
                <Link to='/Report/'><h3>Report</h3></Link>
            </NavItem>


        </Nav>)
}
export default Menu;