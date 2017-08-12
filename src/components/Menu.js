/**
 * Created by bikramkawan on 8/12/17.
 */
import React from 'react';
import {Link} from 'react-router-dom'

const Menu = () => {
    return ( <nav className="navbar navbar-default">
        <div className="container-fluid">
            <ul className="nav navbar-nav">
                <li className="nav-item">
                    <Link to='/AddTransaction/'><h3>Add Transaction</h3></Link>
                </li>
                  <li className="nav-item">
                    <Link to='/Report/'><h3>Report</h3></Link>
                </li>

            </ul>

        </div>
    </nav>)

}
export default Menu;