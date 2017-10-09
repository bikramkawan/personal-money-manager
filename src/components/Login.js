/**
 * Created by bikramkawan on 9/1/17.
 */
import React, {Component} from 'react';
import {firebaseApp, userdata} from '../config/Firebase'
import {connect} from 'react-redux';
import {userLogin, userData} from '../actions'
import {Link} from 'react-router-dom'
import FrontNavBar from './NavBar/UnAuthNav'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: {
                message: ''
            }
        }
    }

    login = ()=> {

        const {email, password} = this.state;
        firebaseApp.auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error=> this.setState({error}))

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


    render() {
        return (
            <div className="container login" style={{margin: '5%'}}>
                <FrontNavBar/>
                <div className="form-group">
                    <input type="text"
                           placeholder="Enter Email"
                           className="form-control"
                           style={{margin: '10px'}}
                           onChange={({target})=>this.setState({email: target.value})}
                    />
                    <input type="password"
                           placeholder="Enter Password"
                           className="form-control"
                           style={{margin: '10px'}}
                           onChange={({target})=>this.setState({password: target.value})}
                    />


                    <button className="btn btn-primary" style={{margin: '10px'}} onClick={this.login}>Login</button>

                </div>
            </div>


        )


    }


}


function mapStateToProps(state) {
    return {
        store: state
    }


}

export default connect(mapStateToProps, {userLogin, userData})(Login)