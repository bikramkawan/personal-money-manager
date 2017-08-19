/**
 * Created by bikramkawan on 8/9/17.
 */
import React, {Component} from 'react';
import AddTransaction from './components/AddTransaction'
import {Route} from 'react-router-dom'
import Menu from './components/Menu'
import Report from './components/Report'
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.store;
        this.state = {
            data: []
        }

    }


    loadRecordsFromServer() {
        axios.get(this.props.url)
            .then(res => {
                this.setState({data: res.data});
            })
    }

    onSave = (data) => {
        let records = this.state.data;
        let newComments = records.concat([data]);
        console.log(records)
        this.setState({data: newComments});
        axios.post(this.props.url, data)
            .catch(err => {

                this.setState({data: records});
            });

    }

    onUpdate = (uniqueKey, data) => {
        axios.put(`${this.props.url}/${uniqueKey}`, data)
            .catch(err => {
                console.log(err);
            })
    }

    onDelete = (uniqueKey) => {
        axios.delete(`${this.props.url}/${uniqueKey}`)
            .then(res => {
                console.log('Comment deleted');
            })
            .catch(err => {
                console.error(err);
            });

    }

    componentDidMount() {
        this.loadRecordsFromServer();

    }

    render() {
        return (
            <div className="app">
                <Menu/>

                <Route path='/AddTransaction/'
                       component={()=> <AddTransaction
                           store={this.store}
                           data={this.state.data}
                           onUpdate={this.onUpdate}
                           onDelete={this.onDelete}
                           onSave={this.onSave}/>}

                />
                <Route path='/Report/' component={()=> <Report store={this.store} data={this.state.data}/>}/>
            </div>)
    }

}

export default App