/**
 * Created by bikramkawan on 8/10/17.
 */
import React, {Component} from 'react';

export  default class InputBox extends Component {

    constructor(props){
        super(props);


    }

    render() {
        console.log(this.props.placeholder)
        return (<div className="inputContainer">
                <input type="text" placeholder={this.props.placeholder}/>
            </div>
        )
    }
}