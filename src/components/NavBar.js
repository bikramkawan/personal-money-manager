/**
 * Created by bikramkawan on 9/3/17.
 */
import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {firebaseApp, userdata} from '../config/Firebase'
class NavBar extends Component {

    constructor(props) {
        super(props);

    }

    logout = ()=> {

        firebaseApp.auth().signOut();
        this.props.history.push('/')

    }

     render() {
       const {pathname} =this.props.location;
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container">
                    <ul className="nav navbar-nav pull-right">
                        <li className="nav-list authed">

                            {this.props.authed ?
                                <span><NavLink to="/app/transactions" className={`navbar-brand ${pathname === '/app/'}`}
                                               activeClassName="selected"
                                               exact>Transactions</NavLink>
                              <NavLink to="/app/transactions/report" className="navbar-brand" exact
                                       activeClassName="selected">Report</NavLink>
                               </span>
                                : ''}
                        </li>
                        {/*<li>*/}
                        {/*<Link to="/dashboard" className="navbar-brand">Dashboard</Link>*/}
                        {/*</li>*/}
                        <li className="nav-list logout">
                            {this.props.authed
                                ? <button
                                style={{border: 'none', background: 'transparent'}}
                                className="navbar-brand" onClick={this.logout}>Logout</button>
                                : <span>
                        <Link to="/login" className="navbar-brand">Login</Link>
                        <Link to="/register" className="navbar-brand">Register</Link>
                      </span>}
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }


}

export default NavBar;