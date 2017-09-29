import React,{Component} from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import Report from '../Report';
import * as _ from 'lodash';
import {connect} from 'react-redux'
import AddTransaction from '../AddTransaction';
import BrowseUsersPage from '../BrowseUsersPage'
import {userData} from '../../actions'
import Income from '../Report/Cateogry/Income';
import Expense from '../Report/Cateogry/Expense'
import {firebaseApp,userdata} from '../../config/Firebase'
class ReportLayout extends Component {

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
                    <Route path={this.props.match.path} exact component={Report} />
                    <Route path={`${this.props.match.path}/income`} exact component={Income} />
                    <Route path={`${this.props.match.path}/expense`}  component={Expense} />
                </Switch>
            </div>
        </div>)
    }


}



function mapStateToProps({user}) {
    if(!user) return ;
    const {userid} = user
    return {
        userid
    }

}

export default connect(mapStateToProps,{userData})(ReportLayout)