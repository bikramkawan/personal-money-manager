/**
 * Created by bikramkawan on 9/3/17.
 */
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {firebaseApp} from '../../config/Firebase'
import endpoints from '../../shared/endpoints'

class AuthNav extends Component {

    logout = ()=> {
        firebaseApp.auth().signOut();
        this.props.history.push('/')

    }

    render() {
        const {pathname} =this.props.location;
        return (
            <nav className="navbar navbar-default navbar-static-top transaction-nav">
                <div className="container">
                    <ul className="nav navbar-nav pull-right">
                        <li className="nav-list authed">

                            <NavLink to={endpoints.transactions}
                                     className={`navbar-brand ${pathname === '/app/' || pathname === '/app'}`}
                                     activeClassName="selected"
                                     exact>Transactions</NavLink>
                            <NavLink to={endpoints.report} className="navbar-brand" exact
                                     activeClassName="selected">Report</NavLink>
                            <span
                                style={{border: 'none', background: 'transparent'}}
                                className="navbar-brand" onClick={this.logout}>Logout
                            </span>
                        </li>


                    </ul>
                </div>
            </nav>
        )
    }


}

export default AuthNav;