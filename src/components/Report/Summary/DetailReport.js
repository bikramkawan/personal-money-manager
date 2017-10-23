/**
 * Created by bikramkawan on 8/15/17.
 */
import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import {filterData} from '../../../actions';
import * as _ from 'lodash'
import ReportSubNavBar from '../../NavBar/ReportSubNavBar'
import categories from '../../../shared/utils'


class DetailReport extends Component {

    checkEntries(parent, child) {
        let sumBy = null;
        if (this.report === 'expense') {
            const onlyExpense = this.props.userdata
                .filter(item=>item.category.parent !== 'income')
                .filter(d=>d.category.child === child && d.category.parent === parent)
                .filter(e=>!isNaN(parseFloat(e.credit)));
            sumBy = _.sumBy(onlyExpense, 'credit')
        } else {
            const onlyIncome = this.props.userdata.filter(item=>item.category.parent === 'income')
                .filter(d=>d.category.child === child && d.category.parent === parent)
                .filter(e=>!isNaN(parseFloat(e.debit)));
            sumBy = _.sumBy(onlyIncome, 'debit')
        }
        return sumBy;

    }

    calcTotals(parent) {
        const filtered = this.props.userdata
            .filter(d=>d.category.parent === parent)
        //.filter(e=> !isNaN(e.debit) && isNaN(e.credit));

        const sumvalue = (this.report === 'expense') ?
            _.sumBy(filtered.filter(e=> isNaN(parseFloat(e.debit)) && !isNaN(parseFloat(e.credit))), 'credit') :
            _.sumBy(filtered.filter(e=> !isNaN(parseFloat(e.debit)) && isNaN(parseFloat(e.credit))), 'debit');
        return sumvalue;


    }

    renderChunks() {
        this.report = (this.props.match.path.indexOf('expense') > 0) ? 'expense' : 'income';
        let parent = _.keys(categories).filter(cat=>cat === 'income')
        if (this.report === 'expense') {
            parent = _.keys(categories).filter(cat=>cat !== 'income')
        }
        return parent.map(parentCat => {
            const childs = _.keys(categories[parentCat])
            const totals = this.calcTotals(parentCat)
            return (
                <Grid className="grid makeTable Income " key={parentCat}>
                    <Row className='header'>
                        <Col md={6}>{parentCat}</Col>
                        <Col md={2}>Budget</Col>
                        <Col md={2}>Actual</Col>
                        <Col md={2}>Difference</Col>
                    </Row>
                    {childs.map(childCat=> {
                        const value = this.checkEntries(parentCat, childCat);
                        return (<Row className='title' key={childCat}>
                            <Col md={6}>{childCat}</Col>
                            <Col md={2}>{'-'}</Col>
                            <Col md={2}>{value ? value.toFixed(2) : '-'}</Col>
                            <Col md={2}>{value ? value.toFixed(2) : '-'}</Col>
                        </Row>)
                    })}
                    <Row className='total'>
                        <Col md={6}>Total</Col>
                        <Col md={2}>{'-'}</Col>
                        <Col md={2}>{totals ? totals.toFixed(2) : '-'}</Col>
                        <Col md={2}>{totals ? totals.toFixed(2) : '-'}</Col>
                    </Row>
                </Grid>


            )
        })
    }


    render() {
        if (!this.props.userdata) return <div></div>;
        return (

            <div style={{overflow: 'hidden'}}>
                <ReportSubNavBar/>
                <div className="detail-report-container">
                    {this.renderChunks()}
                </div>


            </div>)
    }

}

function mapStateToProps({user}) {
    if (!user) return {};
    const {userdata} = user
    return {
        userdata
    }

}

export default connect(mapStateToProps, {filterData})(DetailReport)