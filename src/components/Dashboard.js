/**
 * Created by bikramkawan on 9/3/17.
 */
import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import Report from './Report';
import AddTransaction from './AddTransaction';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {userdata} from '../config/Firebase'

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    onSave = (data) => {
        console.log(data);
        const {userid} = this.props;
        const thisUser = userdata.child(userid);
        thisUser.push(data)


    }
    onUpdate = (uniqueKey, data) => {

    }

    onDelete = (uniqueKey) => {

    }

    render() {
        console.log(this.props)
        return (<div><Navbar>
            <Nav>
                <NavItem><Link to="/dashboard/addtransaction">Add Transaction</Link></NavItem>
                <NavItem><Link to="/dashboard/report">Report</Link></NavItem>
            </Nav>

        </Navbar>
            <Route path='/dashboard/addtransaction' component={()=> <AddTransaction
                {...this.props}
                onUpdate={this.onUpdate}
                onDelete={this.onDelete}
                onSave={this.onSave}/>}/>
            <Route path='/dashboard/report' component={Report}/>

        </div>
    )
    }


    }

    export default Dashboard;