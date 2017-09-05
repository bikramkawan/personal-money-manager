/**
 * Created by bikramkawan on 8/20/17.
 */
import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap'
import * as $ from 'jquery';
import {expenseCategories,filterAndSumBy} from '../../shared/utils'
import * as _ from 'lodash';
export default class ExpenseSummary extends Component {
    componentDidMount() {
        const totalWidth = _.sumBy(this.props.data, 'credit');
        const catWidth = _.keys(expenseCategories).map((d, i)=> {
            const val = filterAndSumBy(this.props.data, 'category', d, 'credit');
            return {
                cat: d,
                'val': val,
                width: 1 / totalWidth * val * 100
            }
        });
        catWidth.forEach((d)=>$(`.expense-${d.cat}`).css('width', `${d.width}%`))

    }

    renderCategories() {
        const catRows = _.keys(expenseCategories).map((d, i)=><Row key={i} className='text-capitalize'>
            <Col md={3}>{d}</Col>
            <Col md={9} className="bar">
                <div className={`expense-${d}`}></div>
            </Col>
        </Row>);
        return catRows;

    }

    renderLegend() {
        const totalExpense = _.sumBy(this.props.data, 'credit');
        const legendVal = Array.from({length: 4}, (v, i) => totalExpense / 4 * (i + 1));
        const legedCols = legendVal.map((d, i)=> <Col key={i} md={3}>{d}</Col>);
        return <Row className="indicator">
            {legedCols}
        </Row>
    }

    render() {
        return <Grid className="grid barChart" style={{marginBottom:'50px'}}>
            <Row>
                <Col md={3}> </Col>
                <Col md={4} className="legend">
                    <div className="budget"></div>
                    <div>Budget</div>
                    <div className="actual"></div>
                    <div>Actual</div>
                </Col>
            </Row>
            {this.renderLegend()}
            {this.renderCategories()}
        </Grid>
    }
}