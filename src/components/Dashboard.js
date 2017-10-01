/**
 * Created by bikramkawan on 9/3/17.
 */
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Report from './Report';
import * as _ from 'lodash';
import AddTransaction from './AddTransaction';
import {userdata} from '../config/Firebase';
import {connect} from 'react-redux';

class Dashboard extends Component {

    // constructor(props) {
    //     super(props);
    //     this.userid = this.props.userid;
    //     this.userRef = userdata.child(this.userid);
    // }

    onSave = (data) => {

        this.userRef = userdata.child(this.props.userid);
        this.userRef.push(data)


    }
    onUpdate = (uniqueKey, data) => {
        this.userRef = userdata.child(this.props.userid);
        const isNull = !_.values(data).some(x => !_.isEmpty(x));
        if (isNull) return;
        this.userRef.child(uniqueKey).set(data);

    }

    onDelete = (uniqueKey) => {
        this.userRef = userdata.child(this.props.userid);
        this.userRef.child(uniqueKey).remove();

    }

    componentDidMount() {

        //   this.userid = this.props.userid;
        // this.userRef = userdata.child(this.userid);

        // const {userid} = this.props;
        // const thisUser = userdata.child(userid);
        // thisUser.on('value', (snap, i)=> {
        //     let data = [];
        //     snap.forEach((d, i)=> {
        //         data.push({...d.val(), key: d.key})
        //
        //     })
        //     this.setState({data})
        // })


    }

    render() {
        return (
            <AddTransaction
                onUpdate={this.onUpdate}
                onDelete={this.onDelete}
                onSave={this.onSave}/>

        )
    }


}

function mapStateToProps({user}) {
    if (!user) return {};
    const {userid} = user;
    return {
        userid
    }


}

export default connect(mapStateToProps, null)(Dashboard)