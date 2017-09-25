/**
 * Created by bikramkawan on 8/13/17.
 */
import React, {Component} from 'react';
import BudgetSummary from './Report/BudgetSummary';
import * as _ from 'lodash';
import BarChart from './Report/BarChart'
import {Nav, NavItem, Navbar} from 'react-bootstrap';
import {Link, Route} from 'react-router-dom';
import Income from './Report/Cateogry/Income'
import Expense from './Report/Cateogry/Expense'
import ExpenseSummary from './Report/ExpenseSummary'
import {Grid, Row, Col} from 'react-bootstrap'
import D3BarChart from './Report/D3BarChart'
import D3BarNegative from './Report/D3BarNegative'
export default class Report extends Component {

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
        console.log(totalCredit)
        console.log(this.props)
        var data = [
            {"name": "Total Income", "value": totalDebit},
            {"name": "Total Expense", "value": totalCredit},
            {"name": "Net", "value": net}
        ];

        const income = {salary: summary.totalDebit};

        return (
            <div style={{overflow: 'hidden'}}>
                <Navbar>
                    <Nav>
                        <NavItem><Link to="/dashboard/report/income">Income</Link></NavItem>
                        <NavItem><Link to="/dashboard/report/expense">Expense</Link></NavItem>
                    </Nav>
                </Navbar>

                <Grid>
                    <Row className="report" style={{display: 'flex'}}>
                        <Col md={6}>

                            <Route exact path='/dashboard/report' component={()=><BudgetSummary summary={summary}/>}/>

                        </Col>
                        <Col md={6} className="myChart">
                            <Route exact path='/dashboard/report'
                                   component={()=>summary.isNegative ?
                                       <D3BarNegative selector={"myChart"} data={data}/> :
                                       <D3BarChart selector={"myChart"} data={data}/>}
                            />

                        </Col>
                    </Row>
                </Grid>

                <Route path='/dashboard/report/income' component={()=>
                    <Income income={income}/>}/>
                <Route path='/dashboard/report/expense' component={()=>
                    <Expense data={this.props.userdata} totalCredit={summary.totalCredit}/>}/>
                <Route path='/dashboard/report/expense' component={()=>
                    <ExpenseSummary data={this.props.userdata}/>}/>


            </div>

        )
    }


}
