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
        this.state = {data: []};
        this.userid = this.props.userid;
        this.userRef = userdata.child(this.userid);
    }

    onSave = (data) => {
        console.log(data)
        this.userRef.push(data)


    }
    onUpdate = (uniqueKey, data) => {

        console.log(data, uniqueKey)
        if(data.payment===null) return;
        this.userRef.child(uniqueKey).set(data);

    }

    onDelete = (uniqueKey) => {
        this.userRef.child(uniqueKey).remove();

    }

    componentDidMount() {
        const {userid} = this.props;
        const thisUser = userdata.child(userid);
        thisUser.on('value', (snap, i)=> {
            let data = [];
            snap.forEach((d, i)=> {
                console.log(d.key)
                data.push({...d.val(), key: d.key})

            })
            this.setState({data})
        })


    }

    render() {
        console.log(this.props, this.userid)
        return (<div><Navbar>
                <Nav>
                    <NavItem><Link to="/dashboard/addtransaction">Add Transaction</Link></NavItem>
                    <NavItem><Link to="/dashboard/report">Report</Link></NavItem>
                </Nav>

            </Navbar>
                <Route path='/dashboard/addtransaction' component={()=> <AddTransaction
                    {...this.props}
                    data={this.state.data}
                    onUpdate={this.onUpdate}
                    onDelete={this.onDelete}
                    onSave={this.onSave}/>}/>
                <Route path='/dashboard/report' component={()=><Report {...this.props} data={this.state.data}/>}/>

            </div>
        )
    }


}

export default Dashboard;