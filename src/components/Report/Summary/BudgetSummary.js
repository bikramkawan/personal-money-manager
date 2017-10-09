/**
 * Created by bikramkawan on 8/14/17.
 */
import React, {Component} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

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

        return (<Grid className="grid budgetSummary" fluid={true}>
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
                <Col md={3}>{summary.budgetIncome.toFixed(2)}</Col>
                <Col md={3}>{summary.actualIncome.toFixed(2)}</Col>
                <Col md={3}>{summary.diffIncome.toFixed(2)}</Col>
            </Row>

            <Row className="body">
                <Col md={3}>Total Expenses</Col>
                <Col md={3}>{summary.budgetExpense.toFixed(2)}</Col>
                <Col md={3}>{summary.actualExpense.toFixed(2)}</Col>
                <Col md={3}>{summary.diffExpense.toFixed(2)}</Col>
            </Row>

            <Row className="body net">
                <Col md={3}>Net</Col>
                <Col md={3}>{summary.netBudget.toFixed(2)} </Col>
                <Col md={3}>{summary.netActual.toFixed(2)}</Col>
                <Col md={3}>{summary.netDiff.toFixed(2)}</Col>
            </Row>


        </Grid>)
    }

}