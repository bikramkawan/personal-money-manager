import React,{Component} from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import Report from '../Report';
import * as _ from 'lodash';
import {connect} from 'react-redux'
import AddTransaction from '../AddTransaction';
import BrowseUsersPage from '../BrowseUsersPage'
import {userData} from '../../actions'
import {firebaseApp,userdata} from '../../config/Firebase'
class UserSubLayout extends Component {

    constructor(props){
        super(props);


    }


    componentWillReceiveProps(nextProps){

        console.log(nextProps)
        console.log(nextProps)
        if(!nextProps.userid) return
        const {userid} = nextProps;
        const thisUser = userdata.child(userid);
        thisUser.on('value', (snap, i)=> {
            let data = [];
            snap.forEach((d, i)=> {
                data.push({...d.val(), key: d.key})

            })
            nextProps.userData(data);
            console.log(data)
           // this.setState({data})
        })

    }
    componentDidMount(){

        if(!this.props.userid) return
        const {userid} = this.props;
        const thisUser = userdata.child(userid);
        thisUser.on('value', (snap, i)=> {
            let data = [];
            snap.forEach((d, i)=> {
                data.push({...d.val(), key: d.key})

            })
            this.props.userData(data);
            console.log(data)
            // this.setState({data})
        })

    }

    render(){
        return (<div className="user-sub-layout">
            <div className="primary-content">
                <Switch>
                    <Route path={this.props.match.path} exact component={BrowseUsersPage} />
                    <Route path={`${this.props.match.path}/add`} exact component={AddTransaction} />
                    <Route path={`${this.props.match.path}/userId`}  component={Report} />
                </Switch>
            </div>
        </div>)
    }


}



function mapStateToProps({user}) {
    console.log(user)
    if(!user) return ;
    const {userid} = user
    return {
        userid
    }

}

export default connect(mapStateToProps,{userData})(UserSubLayout)