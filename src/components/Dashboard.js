/**
 * Created by bikramkawan on 9/3/17.
 */
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Report from './Report';
import * as _ from 'lodash';
import AddTransaction from './AddTransaction';
import {userdata} from '../config/Firebase';


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {data: []};
        this.userid = this.props.userid;
        this.userRef = userdata.child(this.userid);
    }

    onSave = (data) => {

        this.userRef.push(data)


    }
    onUpdate = (uniqueKey, data) => {

        const isNull = !_.values(data).some(x => !_.isEmpty(x));
        if (isNull) return;
        this.userRef.child(uniqueKey).set(data);

    }

    onDelete = (uniqueKey) => {
        this.userRef.child(uniqueKey).remove();

    }

    componentDidMount() {
        const {userid} = this.props;
        const thisUser = userdata.child(userid);
        thisUser.on('value', (snap, i)=> {
            let data = [];
            snap.forEach((d, i)=> {
                data.push({...d.val(), key: d.key})

            })
            this.setState({data})
        })


    }

    render() {

        return (<div>
                <Route path='/dashboard/addtransaction' component={()=> <AddTransaction
                    {...this.props}
                    data={this.state.data}
                    onUpdate={this.onUpdate}
                    onDelete={this.onDelete}
                    onSave={this.onSave}/>}/>
                <Route path='/dashboard/report' component={()=><Report {...this.props} data={this.state.data}/>}/>


            </div>
        )
    }


}

export default Dashboard;