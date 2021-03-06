import {Switch, Route, Redirect} from 'react-router-dom'
import AuthNav from '../NavBar/AuthNav'
import React, {Component} from 'react';
import {firebaseApp} from '../../config/Firebase'

import DashboardLayout from './DashboardLayout'

class AppLayout extends Component {

    componentDidMount() {
        this.registerFirebase = firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('Success')
            } else {
                console.log(user, 'false')
                this.props.history.push('/')
            }
        })
    }

    render() {
        return (

            <div className="app-layout">
                <AuthNav authed={true} {...this.props}/>
                <main>
                    <Switch>
                        <Route path={`${this.props.match.path}`} exact component={DashboardLayout}/>
                        <Route path={`${this.props.match.path}/transactions`} component={DashboardLayout}/>

                        <Redirect to={`${this.props.match.url}`}/>
                    </Switch>
                </main>
            </div>
        )

    }
}


export default AppLayout;