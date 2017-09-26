/**
 * Created by bikramkawan on 9/3/17.
 */
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {firebaseApp,userdata} from '../config/Firebase'
class NavBar  extends Component  {

    constructor(props){
        super(props);

    }
    logout = ()=>{

        firebaseApp.auth().signOut();
        this.props.history.push('/')

    }


render(){
    return (
        <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
                <ul className="nav navbar-nav pull-right">
                    <li>

                        {this.props.authed ?
                            <span><Link to="/app/transaction/add" className="navbar-brand">Add Transaction</Link>
                              <Link to="/app/transaction/report" className="navbar-brand">Report</Link>
                               </span>
                            : ''}
                    </li>
                    {/*<li>*/}
                    {/*<Link to="/dashboard" className="navbar-brand">Dashboard</Link>*/}
                    {/*</li>*/}
                    <li>
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