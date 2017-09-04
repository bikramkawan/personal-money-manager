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


export default class Report extends Component {

    constructor(props) {
        super(props);
    }

    getSummary() {


        const totalCredit = _.sumBy(this.props.data, (d)=> parseFloat(d.credit) > 0 ? parseFloat(d.credit) : 0);
        const totalDebit = _.sumBy(this.props.data, (d)=> parseFloat(d.debit) > 0 ? parseFloat(d.debit) : 0);
        return {totalCredit: totalCredit, totalDebit: totalDebit}

    }

    render() {
        const summary = this.getSummary();
        const income = {salary: summary.totalDebit};

        return (
            <div style={{overflow: 'auto'}}>
                <Navbar>
                    <Nav>
                        <NavItem><Link to="/dashboard/report/income">Income</Link></NavItem>
                        <NavItem><Link to="/dashboard/report/expense">Expense</Link></NavItem>
                    </Nav>
                </Navbar>
                <Route exact path='/dashboard/report' component={()=><BudgetSummary summary={summary}/>}/>
                <Route exact path='/dashboard/report' component={()=><BarChart summary={summary}/>}/>
                <Route path='/dashboard/report/income' component={()=>
                    <Income income={income}/>}/>
                <Route path='/dashboard/report/expense' component={()=>
                    <Expense data={this.props.data} totalCredit={summary.totalCredit}/>}/>

                {/*<ExpenseSummary data={this.props.data}/>*/}


            </div>

        )
    }


}
