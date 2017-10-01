import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Report from '../Report';
import {connect} from 'react-redux'
import {userData} from '../../actions'
import Income from '../Report/Cateogry/Income';
import Expense from '../Report/Cateogry/Expense'

class ReportLayout extends Component {

    render() {
        return (
            <div className="report-content">
                <Switch>
                    <Route path={this.props.match.path} exact component={Report}/>
                    <Route path={`${this.props.match.path}/income`} exact component={Income}/>
                    <Route path={`${this.props.match.path}/expense`} component={Expense}/>
                </Switch>
            </div>
        )
    }


}


function mapStateToProps({user}) {
    if (!user) return {};
    const {userid} = user
    return {
        userid
    }

}

export default connect(mapStateToProps, {userData})(ReportLayout)