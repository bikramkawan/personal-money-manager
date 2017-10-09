/**
 * Created by bikramkawan on 10/6/17.
 */

import React from 'react';
import {Link} from 'react-router-dom';
import {Nav, NavItem} from 'react-bootstrap';
import endpoints from '../../shared/endpoints'

const FrontNavBar = () => {
    return (
        <Nav bsStyle="pills">
            <NavItem >
                <Link to={endpoints.register}><h3>Register</h3></Link>
            </NavItem>
            <NavItem>
                <Link to={endpoints.login}><h3>Login</h3></Link>
            </NavItem>


        </Nav>)
}
export default FrontNavBar;