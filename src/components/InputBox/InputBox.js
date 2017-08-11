/**
 * Created by bikramkawan on 8/10/17.
 */
import React, {Component} from 'react';
const mystore = require('store2');

export  default class InputBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value||''
        }

    }

    handleChange = ({target:{value}}) => {
        mystore.set('2','fromInput')
        this.setState({value: value}, ()=>this.props.onChange(value))
    }

    render() {
        console.log(mystore.getAll())
        return (<div className="inputContainer">
                <input type="text" placeholder={this.props.placeholder}
                       onChange={this.handleChange}
                       value={this.state.value}
                />
            </div>
        )
    }
}