/**
 * Created by bikramkawan on 8/11/17.
 */
import React, {Component} from 'react';
import InputBox from '../InputBox/InputBox';
import {connect} from 'react-redux'
import {Glyphicon, Row, Col, Button} from 'react-bootstrap';
const mapStateToProps = state => {
    return {...state}
}

class Transaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false
        }
        this.store = this.props.store;

    }


    delete = (id) => {
        console.log(id)
        this.props.onDeleteRow(id);
    }
    handleChange = (ref, args)=> {

        this.props.onChange({ref: ref, value: args, id: this.props.data.id})

    }

    editMe = (id) => {
        console.log(id)
        this.setState({isEditMode: true}, ()=>this.props.onEdit(id))
    }

    toggleRender(ref, value) {
        if (this.state.isEditMode) {
            return <InputBox
                ref={ref}
                placeholder="Enter #.."
                value={value}
                onChange={this.handleChange.bind(this, ref)}
            />
        }
        return value;

    }

    componentWillReceiveProps() {

        this.setState({isEditMode: false})
    }

    render() {
        return (
            <Row data-id={this.props.data.id}>
                <Col md={1}>{this.toggleRender('id', this.props.data.id)}</Col>
                <Col md={2}>{this.toggleRender('date', this.props.data.date)}</Col>
                <Col md={3}>{this.toggleRender('payment', this.props.data.payment)}</Col>
                <Col md={2}>{this.toggleRender('category', this.props.data.category)}</Col>
                <Col md={1}>{this.toggleRender('debit', this.props.data.debit)}</Col>
                <Col md={1}>{this.toggleRender('credit', this.props.data.credit)}</Col>
                <Col md={1}>
                    <Button onClick={this.editMe.bind(this, this.props.data.id)}><Glyphicon
                        glyph="glyphicon glyphicon-edit"/></Button>

                </Col>
                <Col md={1}>
                    <Button onClick={this.delete.bind(this, this.props.data.id)}>
                        <Glyphicon glyph="glyphicon glyphicon-trash"/></Button>


                </Col>

            </Row>
        )

    }


}
export default connect(mapStateToProps)(Transaction);