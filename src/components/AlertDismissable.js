/**
 * Created by bikramkawan on 8/12/17.
 */
import React, {Component} from 'react';
import {Alert} from 'react-bootstrap';

export  default class AlertDismissable extends Component {

    constructor() {
        super();
        this.state = {

            alertVisible: false

        }
    }

    handleAlertDismiss() {
        this.setState({alertVisible: false});
    }

    render() {
        if (this.state.alertVisible) {
            return (<Alert bsStyle="danger" onDismiss={this.handleAlertDismiss.bind(this)}>
                Saved Successfully !
            </Alert>)
        }

        return <div></div>
    }


}