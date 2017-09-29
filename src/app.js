/**
 * Created by bikramkawan on 8/9/17.
 */
import React, {Component} from 'react';
import {Route, HashRouter, Link, Redirect,Switch} from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard'
import {firebaseApp,userdata} from './config/Firebase'
import {connect} from 'react-redux';
import {userLogin,userData} from './actions'
import NavBar from './components/NavBar'
import UnauthorizedLayout from './components/Layout/UnauthorizedLayout'
import AuthorizedRoute from './components/Layout/AuthorizedRoute'
import PrimaryLayout from './components/Layout/PrimaryLayout'


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

    /* Currrently not using express at the moment
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
     */


    componentDidMount() {
        //  this.loadRecordsFromServer();
        // this.registerFirebase = firebaseApp.auth().onAuthStateChanged((user) => {
        //     if (user) {
        //         this.setState({authed: true, userid: user.uid, email: user.email})
        //         this.props.userLogin(user.email, user.uid);
        //         // const {userid} = user.uid;
        //         const thisUser = userdata.child(user.uid);
        //         thisUser.on('value', (snap, i)=> {
        //             let data = [];
        //             snap.forEach((d, i)=> {
        //                 data.push({...d.val(), key: d.key})
        //
        //             })
        //             this.setState({data})
        //             this.props.userData(data);
        //
        //         })
        //
        //     } else {
        //         this.setState({
        //             authed: false,
        //         })
        //     }
        // })


        this.registerFirebase = firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                   // const {userid} = user.uid;
                const thisUser = userdata.child(user.uid);
                thisUser.on('value', (snap, i)=> {
                    const userdata = [];
                    snap.forEach((d, i)=> {
                        userdata.push({...d.val(), key: d.key})

                    })
                    //this.setState({data})

                    this.props.userLogin(user.email, user.uid,true,userdata);

                })
                this.props.history.push('/app')
            } else {
                console.log(user)
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
                {/*<NavBar {...this.props}/>*/}
                                  {/*<Switch>*/}
                        {/*<Route path='/' render={()=>this.state.authed ? <Redirect to='/dashboard'/> : <div></div>}/>*/}
                        {/*<Route path='/login' render={()=>this.state.authed ? <Redirect to='/dashboard'/> : <Login/>}/>*/}
                        {/*<Route path='/dashboard'*/}
                               {/*render={()=>this.state.authed ?*/}
                                   {/*<Dashboard userid={this.state.userid} email={this.state.email}/> :*/}
                                   {/*<Redirect to='/login'/>}/>*/}
                        {/*<Route path='/register' component={Register}/>*/}
                        {/*</Switch>*/}


                    <Switch>
                        <Route path="/auth" component={UnauthorizedLayout} />
                        <AuthorizedRoute path="/app" component={PrimaryLayout}/>
                        <Redirect to="/auth" />
                    </Switch>




                </div>
            </HashRouter>)
    }

}


function mapStateToProps(state) {
    return {
        store: state
    }


}

export default connect(mapStateToProps,{userLogin})(App)