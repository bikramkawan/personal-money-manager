/**
 * Created by bikramkawan on 8/14/17.
 */
import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap'
import * as $ from 'jquery';
import * as _ from 'lodash';

export default class BarChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            legendValues: []
        };
    }

    componentDidMount() {

        const totalWidth = $('.barChart.container').innerWidth();
        const {totalIncome, totalExpense, legendValues} = scaleAmount(totalWidth, this.props.summary)
        $('.income').css('width', `${totalIncome}%`)
        $('.expense').css('width', `${totalExpense}%`)
        $('.netDiff').css('width', `${totalIncome - totalExpense}%`)
        this.setState({legendValues})


    }

    renderLegends() {

        return this.state.legendValues.map((value)=> <Col md={3} key={value}>{value}</Col>)

    }


    render() {

        return <Grid className="grid barChart" fluid={true}>
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
                {this.renderLegends()}
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

function scaleAmount(clientWidth, amountSummary) {
    let maxValue = Math.max(... _.values(amountSummary))
    maxValue = maxValue + maxValue * 0.2;
    const scaleYOverX = (maxValue) / (clientWidth);
    const totalExpense = ((amountSummary.totalCredit) / scaleYOverX) / clientWidth * 100;
    const totalIncome = ((amountSummary.totalDebit) / scaleYOverX) / clientWidth * 100;
    const arr = Array.from({length: 3}, (v, i) => i);
    const legendValues = arr.map(d=>maxValue / 3 * d)
    legendValues.push(maxValue);
    return {totalExpense, totalIncome, legendValues}
}

