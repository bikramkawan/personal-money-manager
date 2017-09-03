/**
 * Created by bikramkawan on 8/13/17.
 */
import React, {Component} from 'react';
import BudgetSummary from './Report/BudgetSummary';
import * as _ from 'lodash';
import BarChart from './Report/BarChart'
import {Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';

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
            <div style={{overflow: 'auto'}}><BudgetSummary summary={summary}/>
                <BarChart summary={summary}/>
                {/*<Income income={income}/>*/}
                {/*<Expense data={this.props.data} totalCredit={summary.totalCredit}/>*/}
                {/*<ExpenseSummary data={this.props.data}/>*/}
                <Nav bsStyle="pills">

                    <NavItem>
                        <Link to='/Report/Income'><h3>Income</h3></Link>
                    </NavItem>

                </Nav>

            </div>

        )
    }


}
