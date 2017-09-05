/**
 * Created by bikramkawan on 8/14/17.
 */
import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap'
import * as $ from 'jquery';

export default class BarChart extends Component {


    componentDidMount() {
        const totalWidth = 2000;
        const totalIncome = 1 / totalWidth * this.props.summary.totalDebit * 100;
        const totalExpense = 1 / totalWidth * this.props.summary.totalCredit * 100;
        $('.income').css('width', `${totalIncome}%`)
        $('.expense').css('width', `${totalExpense}%`)
        $('.netDiff').css('width', `${totalIncome - totalExpense}%`)
    }

    render() {
        return <Grid className="grid barChart">
            <Row>
                <Col md={3}> </Col>
                <Col md={4} className="legend">
                    <div className="budget"></div>
                    <div>Budget</div>
                    <div className="actual"></div>
                    <div>Actual</div>


                </Col>
            </Row>
            <Row className="indicator">
                <Col md={3}>
                    0
                </Col>
                <Col md={3}>
                    500
                </Col>
                <Col md={3}>
                    1000
                </Col>
                <Col md={3}>
                    2000
                </Col>
            </Row>
            <Row>
                <Col md={3}>Total Income </Col>
                <Col md={9} className="bar">
                    <div className="income"></div>
                </Col>
            </Row>
            <Row>
                <Col md={3}>Total Expense </Col>
                <Col md={9} className="bar">
                    <div className="expense"></div>
                </Col>
            </Row>
            <Row>
                <Col md={3}>Net</Col>
                <Col md={9} className="bar">
                    <div className="netDiff"></div>
                </Col>
            </Row>
        </Grid>
    }

}
