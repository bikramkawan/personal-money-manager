
import { Switch, Route, Redirect } from 'react-router-dom'
import NavBar from '../NavBar'
import {connect} from 'react-redux'
import AppHomePage from '../AppHomePage'
import React, {Component} from 'react';
import {firebaseApp,userdata} from '../../config/Firebase'

import {userLogin,userData} from '../../actions'
import UserSubLayout from './UserSubLayout'

class PrimaryLayout extends Component {

    constructor(props){
        super(props);
    }


    componentDidMount(){
        this.registerFirebase = firebaseApp.auth().onAuthStateChanged((user) => {
           if (user) {
                console.log('Success')
              } else {
                console.log(user,'false')
                this.props.history.push('/')
            }
        })
    }

    render(){
        return (

            <div className="primary-layout">
                <NavBar authed={true} {...this.props}/>
                <main>
                    <Switch>
                        <Route path={`${this.props.match.path}`} exact component={UserSubLayout} />
                        <Route path={`${this.props.match.path}/transaction`} component={UserSubLayout} />
                        <Redirect to={`${this.props.match.url}`} />
                    </Switch>
                </main>
            </div>
        )

    }
}


export default PrimaryLayout;