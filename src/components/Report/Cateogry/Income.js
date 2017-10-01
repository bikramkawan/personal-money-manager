/**
 * Created by bikramkawan on 8/15/17.
 */
import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import {userData} from '../../../actions';
import {Nav, NavItem, Navbar} from 'react-bootstrap';
import {Link, Route} from 'react-router-dom';
import * as _ from 'lodash'
import categories, {filterAndSumBy} from '../../../shared/utils'


class Income extends Component {


    checkEntries(parent, child) {
        const filter = _.filter(this.props.userdata, function (d) {
            return d.category.child === child && d.category.parent === parent

        });

        return filter[0];

    }

    calcTotals(parent) {

        const filter = _.filter(this.props.userdata, function (d) {
            return d.category.parent === parent

        });

        const sumvalue = _.sumBy(filter, 'debit');
        console.log(sumvalue)

        return sumvalue;


    }


    renderChunks() {
        const parent = _.keys(categories)
        return parent.map(parentCat => {
            const childs = _.keys(categories[parentCat])
            const totals = this.calcTotals(parentCat)
            return (
                <Grid className="grid makeTable Income" key={parentCat}>
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
                            <Col md={2}>{value ? value.debit : '-'}</Col>
                            <Col md={2}>{value ? value.debit : '-'}</Col>
                        </Row>)
                    })}
                    <Row className='total'>
                        <Col md={6}>Total Income</Col>
                        <Col md={2}>{'-'}</Col>
                        <Col md={2}>{totals ? totals : '-'}</Col>
                        <Col md={2}>{totals ? totals : '-'}</Col>
                    </Row>
                </Grid>


            )
        })
    }


    render() {
        if (!this.props.userdata) return <div></div>;
        return (

            <div style={{overflow: 'hidden'}}>
                <Navbar>
                    <Nav>
                        <NavItem><Link to="/app/transaction/report/income">Income</Link></NavItem>
                        <NavItem><Link to="/app/transaction/report/expense">Expense</Link></NavItem>
                    </Nav>
                </Navbar>
                {this.renderChunks()}

            </div>)
    }

}

function mapStateToProps({user}) {
    if (!user) return{};
    const {userdata} = user
    return {
        userdata
    }

}

export default connect(mapStateToProps, {userData})(Income)