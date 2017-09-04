/**
 * Created by bikramkawan on 8/14/17.
 */
import React, {Component} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

const budget = {debit: 0.0, credit: 0.0};
export default class BudgetSummary extends Component {

    constructor(props) {
        super(props);
        this.summary = this.props.summary;
    }

    mixinData() {
        const budgetIncome = 0.0;
        const budgetExpense = 0.0;
        const budgetNet = budgetIncome - budgetExpense;
        const actualIncome = this.summary.totalDebit;
        const actualExpense = this.summary.totalCredit;
        const netActual = actualIncome - actualExpense;
        const netBudget = budgetIncome-budgetExpense;
        const diffIncome = actualIncome - budgetIncome;
        const diffExpense = actualExpense - budgetExpense;
        const netDiff = diffIncome - diffExpense;

        const summary = {

            budgetIncome: budgetIncome,
            budgetExpense: budgetExpense,
            budgetNet: budgetNet,
            actualIncome: actualIncome,
            actualExpense: actualExpense,
            netActual: netActual,
            diffIncome: diffIncome,
            diffExpense: diffExpense,
            netDiff: netDiff,
            netBudget:netBudget

        };

        return summary;

    }

    render() {


        const summary = this.mixinData();

        return (<Grid className="grid budgetSummary">
            <Row className="header">
                <Col md={12}><h4>Budget Summary</h4></Col>
            </Row>
            <Row className="title">
                <Col md={3}></Col>
                <Col md={3}>Budget </Col>
                <Col md={3}>Actual</Col>
                <Col md={3}>Difference</Col>
            </Row>

            <Row className="body">
                <Col md={3}>Total Income</Col>
                <Col md={3}>{summary.budgetIncome}</Col>
                <Col md={3}>{summary.actualIncome}</Col>
                <Col md={3}>{summary.diffIncome}</Col>
            </Row>

            <Row className="body">
                <Col md={3}>Total Expenses</Col>
                <Col md={3}>{summary.budgetExpense}</Col>
                <Col md={3}>{summary.actualExpense}</Col>
                <Col md={3}>{summary.diffExpense}</Col>
            </Row>

            <Row className="body net">
                <Col md={3}>Net</Col>
                <Col md={3}>{summary.netBudget} </Col>
                <Col md={3}>{summary.netActual}</Col>
                <Col md={3}>{summary.netDiff}</Col>
            </Row>


        </Grid>)
    }

}