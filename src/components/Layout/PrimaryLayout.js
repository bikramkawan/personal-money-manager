
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
            console.log(user)
            if (user) {
                console.log(user)
                this.props.userLogin(user.email, user.uid,true);
                // // const {userid} = user.uid;
                // const thisUser = userdata.child(user.uid);
                // thisUser.on('value', (snap, i)=> {
                //     let data = [];
                //     snap.forEach((d, i)=> {
                //         data.push({...d.val(), key: d.key})
                //
                //     })
                //     this.setState({data})
                //     this.props.userData(data);
                //
                // })

            } else {
                console.log(user)
                this.setState({
                    authed: false,
                })
            }
        })
    }

    render(){
        console.log(this.props)
        return (

            <div className="primary-layout">
                <NavBar />
                <main>
                    <Switch>
                        <Route path={`${this.props.match.path}`} exact component={AppHomePage} />
                        <Route path={`${this.props.match.path}/users`} component={UserSubLayout} />
                        <Redirect to={`${this.props.match.url}`} />
                    </Switch>
                </main>
            </div>
        )



    }



}


function mapStateToProps(store) {
    console.log(store)

    return {

    }

}

export default connect(mapStateToProps, {userLogin})(PrimaryLayout)