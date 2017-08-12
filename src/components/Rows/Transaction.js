/**
 * Created by bikramkawan on 8/11/17.
 */
import React, {Component} from 'react';
import InputBox from '../InputBox/InputBox';
import {connect} from 'react-redux'

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
            <div className="row" data-id={this.props.data.id}>
                <div className="col-md-1 items">{this.toggleRender('id', this.props.data.id)}</div>
                <div className="col-md-2 items">{this.toggleRender('date', this.props.data.date)}</div>
                <div className="col-md-3 items">{this.toggleRender('payment', this.props.data.payment)}</div>
                <div className="col-md-2 items">{this.toggleRender('category', this.props.data.category)}</div>
                <div className="col-md-1 items">{this.toggleRender('debit', this.props.data.debit)}</div>
                <div className="col-md-1 items">{this.toggleRender('credit', this.props.data.credit)}</div>
                <div className="col-md-1 items">
                        <span onClick={this.editMe.bind(this, this.props.data.id)}
                              className="glyphicon glyphicon-edit"></span>

                </div>
                <div className="col-md-1 items">
                       <span onClick={this.delete.bind(this, this.props.data.id)}
                             className="glyphicon glyphicon-trash"></span>

                </div>

            </div>
        )

    }


}
export default connect(mapStateToProps)(Transaction);