import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Report from '../Report/Report';
import DetailReport from '../Report/Summary/DetailReport';

class ReportLayout extends Component {

    render() {
        return (
            <div className="report-content">
                <Switch>
                    <Route path={this.props.match.path} exact component={Report}/>
                    <Route path={`${this.props.match.path}/income`} component={DetailReport}/>
                    <Route path={`${this.props.match.path}/expense`} component={DetailReport}/>
                </Switch>
            </div>
        )
    }


}


export default ReportLayout