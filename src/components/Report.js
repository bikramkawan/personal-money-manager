/**
 * Created by bikramkawan on 8/13/17.
 */
import React, {Component} from 'react';
import BudgetSummary from './Report/BudgetSummary';
import * as _ from 'lodash';
import BarChart from './Report/BarChart'

export default class Report extends Component {

    constructor(props) {
        super(props);
    }

    getSummary() {


        const totalCredit = _.sumBy(this.props.data, (d)=> d.credit > 0 ? d.credit : 0);
        const totalDebit = _.sumBy(this.props.data, (d)=> d.debit > 0 ? d.debit : 0);
        console.log(totalCredit, totalDebit)
        return {totalCredit: totalCredit, totalDebit: totalDebit}

    }

    render() {
        const summary = this.getSummary();

        return (
            <div><BudgetSummary summary={summary}/>
                <BarChart summary={summary}/>
            </div>

        )
    }


}
