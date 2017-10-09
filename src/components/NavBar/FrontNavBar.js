/**
 * Created by bikramkawan on 10/6/17.
 */

import React from 'react';
import {Link} from 'react-router-dom';
import {Nav, NavItem} from 'react-bootstrap';


const FrontNavBar = () => {
    return (
        <Nav bsStyle="pills">
            <NavItem >
                <Link to='/auth/register/'><h3>Register</h3></Link>
            </NavItem>
            <NavItem>
                <Link to='/auth/login'><h3>Login</h3></Link>
            </NavItem>


        </Nav>)
}
export default FrontNavBar;