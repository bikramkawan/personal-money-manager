/**
 * Created by bikramkawan on 8/9/17.
 */
import React, {Component} from 'react';
import {Route, HashRouter,Redirect, Switch} from 'react-router-dom'
import {firebaseApp, userdata} from './config/Firebase'
import {connect} from 'react-redux';
import {userLogin} from './actions'
import UnauthorizedLayout from './components/LayoutManager/UnauthorizedLayout'
import AuthorizedRoute from './components/LayoutManager/AuthorizedRoute'
import AppLayout from './components/LayoutManager/AppLayout'


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

                    this.props.userLogin(user.email, user.uid, true, userdata);

                })
                this.props.history.push('/app')
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
                    <Switch>
                        <Route path="/auth" component={UnauthorizedLayout}/>
                        <AuthorizedRoute path="/app" component={AppLayout}/>
                        <Redirect to="/auth"/>
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

export default connect(mapStateToProps, {userLogin})(App)