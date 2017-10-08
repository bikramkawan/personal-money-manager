/**
 * Created by bikramkawan on 8/13/17.
 */
import React, {Component} from 'react';
import BudgetSummary from './Report/BudgetSummary';
import * as _ from 'lodash';
import {Nav, NavItem, Navbar} from 'react-bootstrap';
import {Link, Route} from 'react-router-dom';
import {Grid, Row, Col} from 'react-bootstrap'
import D3BarChart from './Report/D3BarChart'
import D3BarNegative from './Report/D3BarNegative'
import {connect} from 'react-redux';
class Report extends Component {

    getSummary() {
        const totalCredit = _.sumBy(this.props.userdata, (d)=> parseFloat(d.credit) > 0 ? parseFloat(d.credit) : 0);
        const totalDebit = _.sumBy(this.props.userdata, (d)=> parseFloat(d.debit) > 0 ? parseFloat(d.debit) : 0);
        const net = totalDebit - totalCredit;
        const isNegative = net < 0;
        return {totalCredit, totalDebit, net, isNegative}

    }

    render() {
        const summary = this.getSummary();
        const {totalDebit, totalCredit, net} = summary;
             var data = [
            {"name": "Total Income", "value": totalDebit ,class:'income'},
            {"name": "Total Expense", "value": totalCredit,class:'expense'},
            {"name": "Net", "value": net,class:'net'}
        ];

        const income = {salary: summary.totalDebit};

        return (
            <div style={{overflow: 'hidden'}}>
                <Navbar>
                    <Nav>
                        <NavItem><Link to="/app/transaction/report/income">Income</Link></NavItem>
                        <NavItem><Link to="/app/transaction/report/expense">Expense</Link></NavItem>
                    </Nav>
                </Navbar>

                <Grid>
                    <Row className="report" style={{display: 'flex'}}>
                        <Col md={6}>

                         <BudgetSummary summary={summary}/>

                        </Col>
                        <Col md={6} className="myChart">
                            {summary.isNegative ?
                                       <D3BarNegative selector={"myChart"} data={data}/> :
                                       <D3BarChart selector={"myChart"} data={data}/>}


                        </Col>
                    </Row>
                </Grid>

            </div>

        )
    }


}
function mapStateToProps({user}) {
      if(!user) return ;
    const {userdata} = user
    return {
        userdata
    }

}

export default connect(mapStateToProps, null)(Report)