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



    }
    componentDidMount(){


    }

    render(){
        return (<div className="user-sub-layout">
            <div className="primary-content">
                <Switch>
                    <Route path={this.props.match.path} exact component={AddTransaction} />
                    <Route path={`${this.props.match.path}/add`} exact component={AddTransaction} />
                    <Route path={`${this.props.match.path}/report`}  component={Report} />
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