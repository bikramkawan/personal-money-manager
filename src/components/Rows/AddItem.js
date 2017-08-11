/**
 * Created by bikramkawan on 8/11/17.
 */
import React, {Component} from 'react';
import InputBox from '../InputBox/InputBox';
export default class AddItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ref: '',
            value: ''
        }
    }


    handleChange = (ref, args)=> {
        this.setState({ref: ref, value: args}, ()=> this.props.onChange(this.state))

    }


    render() {
        return (
            <div className="row">
                <div className="col-md-1 ">
                    <InputBox
                        ref='id'
                        placeholder="Enter #.."
                        onChange={this.handleChange.bind(this, 'id')}/>
                </div>
                <div className="col-md-2">
                    <InputBox
                        ref='date'
                        placeholder="Enter date.."
                        onChange={this.handleChange.bind(this, 'date')}/></div>
                <div className="col-md-3">
                    <InputBox
                        ref='payment'
                        placeholder="Enter description.."
                        onChange={this.handleChange.bind(this, 'payment')}/>
                </div>
                <div className="col-md-2">
                    <InputBox
                        ref='category'
                        placeholder="Enter cateogry.."
                        onChange={this.handleChange.bind(this, 'category')}/>
                </div>
                <div className="col-md-1">
                    <InputBox
                        ref='debit'
                        placeholder="Enter debit.."
                        onChange={this.handleChange.bind(this, 'debit')}/></div>
                <div className="col-md-1">
                    <InputBox
                        ref='credit'
                        placeholder="Enter credit.."
                        onChange={this.handleChange.bind(this, 'credit')}/>
                </div>
            </div>

        )
    }


}