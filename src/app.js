/**
 * Created by bikramkawan on 8/9/17.
 */
import React, {Component} from 'react';
import AddTransaction from './components/AddTransaction'
import {Route, Switch, HashRouter, Link, Redirect} from 'react-router-dom'
import Menu from './components/Menu'
import Report from './components/Report'
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard'
import {firebaseApp} from './config/Firebase'


import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.store;
        this.state = {
            data: [],
            authed: false,
            userid: null,
            email: null
        }

    }


    loadRecordsFromServer() {
        axios.get(this.props.url)
            .then(res => {
                this.setState({data: res.data});
            })
    }

    onSave = (data) => {
        let records = this.state.data;
        let newComments = records.concat([data]);
        this.setState({data: newComments});
        axios.post(this.props.url, data)
            .catch(err => {

                this.setState({data: records});
            });

    }

    onUpdate = (uniqueKey, data) => {
        axios.put(`${this.props.url}/${uniqueKey}`, data)
            .catch(err => {
                console.log(err);
            })
    }

    onDelete = (uniqueKey) => {
        axios.delete(`${this.props.url}/${uniqueKey}`)
            .then(res => {
                console.log('Comment deleted');
            })
            .catch(err => {
                console.error(err);
            });

    }

    componentDidMount() {
        //  this.loadRecordsFromServer();
        this.registerFirebase = firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user)
                this.setState({authed: true, userid: user.uid, email: user.email})

            } else {
                this.setState({
                    authed: false,
                })
            }
        })

    }


    logout = ()=> {
        firebaseApp.auth().signOut();
    }

    componentWillUnmount() {
        this.registerFirebase();
    }

    render() {
        return (
            <HashRouter>
                <div className="app">
                    <nav className="navbar navbar-default navbar-static-top">
                        <div className="container">
                            <ul className="nav navbar-nav pull-right">

                                <li>
                                    <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
                                </li>
                                <li>
                                    {this.state.authed
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
                    <div>
                        <Route path='/' render={()=>this.state.authed ? <Redirect to='/dashboard'/> : <div></div>}/>
                        <Route path='/login' render={()=>this.state.authed ? <Redirect to='/dashboard'/> : <Login/>}/>
                        <Route path='/dashboard'
                               render={()=>this.state.authed ?
                                   <Dashboard userid={this.state.userid} email={this.state.email}/> :
                                   <Redirect to='/login'/>}/>
                        <Route path='/register' component={Register}/>

                    </div>


                </div>
            </HashRouter>)
    }

}

export default App