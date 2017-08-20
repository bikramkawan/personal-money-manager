/**
 * Created by bikramkawan on 8/11/17.
 */
import React, {Component} from 'react'
import {Row, Col, Glyphicon} from 'react-bootstrap';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortByAsc: true,
            isSorted: false,
            ref: ''
        }
    }

    onSortBy = (ref) => {
        this.setState({ref: ref, isSorted: true, sortByAsc: !this.state.sortByAsc}, this.props.onSortBy(ref))
    }

    renderSortIcon(ref) {

        if (!this.state.isSorted) return '';
        if (this.state.isSorted && this.state.sortByAsc && this.state.ref === ref) {
            return <Glyphicon
                glyph="glyphicon glyphicon-sort-by-attributes-alt"/>;

        } else if (this.state.isSorted && !this.state.sortByAsc && this.state.ref === ref) {
            return <Glyphicon
                glyph="glyphicon glyphicon-sort-by-attributes"/>;
        }else {
            return '';
        }
    }

    render() {
        return (
            <Row>
                <Col md={1} className="heading">#</Col>
                <Col md={2} className="heading">Date</Col>
                <Col md={3} className="heading sortable" onClick={this.onSortBy.bind(this, 'payment')}>Payment
                    Description{this.renderSortIcon('payment')}</Col>
                <Col md={2} className="heading sortable"
                     onClick={this.onSortBy.bind(this, 'category')}>Category{this.renderSortIcon('category')}</Col>
                <Col md={1} className="heading sortable"
                     onClick={this.onSortBy.bind(this, 'debit')}>Debit{this.renderSortIcon('debit')}</Col>
                <Col md={1} className="heading sortable"
                     onClick={this.onSortBy.bind(this, 'credit')}>Credit{this.renderSortIcon('credit')}</Col>
            </Row>
        )

    }

}

export default Header