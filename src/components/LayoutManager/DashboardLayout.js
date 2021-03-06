import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Dashboard from '../Dashboard/index'
import ReportLayout from './ReportLayout'

class DashboardLayout extends Component {

    render() {
        return (<div className="dashboard-layout">
            <Switch>
                <Route path={this.props.match.path} exact component={Dashboard}/>
                <Route path={`${this.props.match.path}/add`} exact component={Dashboard}/>
                <Route path={`${this.props.match.path}/report`} component={ReportLayout}/>
            </Switch>

        </div>)
    }


}



export default DashboardLayout