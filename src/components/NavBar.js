/**
 * Created by bikramkawan on 9/3/17.
 */
import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = (props) => {

    return (
        <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
                <ul className="nav navbar-nav pull-right">
                    <li>

                        {props.authed ?
                            <span><Link to="/dashboard/addtransaction" className="navbar-brand">Add Transaction</Link>
                              <Link to="/dashboard/report" className="navbar-brand">Report</Link>
                               </span>
                            : ''}
                    </li>
                    <li>
                        <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
                    </li>
                    <li>
                        {props.authed
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

export default NavBar;