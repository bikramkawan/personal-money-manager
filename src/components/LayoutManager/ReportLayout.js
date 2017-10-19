import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Report from '../Report/Report';
import {connect} from 'react-redux'
import {filterData} from '../../actions'
import DetailReport from '../Report/Summary/DetailReport';

class ReportLayout extends Component {

    render() {
        return (
            <div className="report-content">
                <Switch>
                    <Route path={this.props.match.path} exact component={Report}/>
                    <Route path={`${this.props.match.path}/income`} exact component={()=><DetailReport report={'income'}/>}/>
                    <Route path={`${this.props.match.path}/expense`} component={()=><DetailReport report={'expense'}/>}/>
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

export default connect(mapStateToProps, {filterData})(ReportLayout)