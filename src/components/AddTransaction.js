/**
 * Created by bikramkawan on 8/12/17.
 */
import React, {Component} from 'react';
import Header from './Rows/Header'
import Transaction from './Rows/Transaction'
import AddItem from './Rows/AddItem';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {userdata} from '../config/Firebase';

import * as _ from 'lodash';


class AddTransaction extends Component {

    constructor(props) {

        super(props);
        this.state = {
            data: props.data,
            fields: {
                payment: null,
                category: null,
                debit: null,
                credit: null,
                date: null,
            },
            isEditMode: false,
            updateIndex: {},
            value: '',
            isDisableSaveButton: true,
            sortByAsc: true,

        }

        this.store = this.props.store;
    }

    editRow = (uniqueKey) => {
        this.setState({isEditMode: true});
        this.props.onUpdate(uniqueKey, this.state.fields)


    }


    deleteRow = (uniqueKey) => {

        const index = this.props.userdata.findIndex(d=>d.key === uniqueKey);
        const temp = this.props.userdata.slice();
        temp.splice(index, 1);
        this.setState({data: temp}, ()=>this.props.onDelete(uniqueKey))


    }
    handleChange = (args)=> {
        this.setState({fields: args.fields})


    }
    onSortByName = () => {
        const data = this.props.userdata.slice();
        const sortBy = this.state.sortByAsc ? 'asc' : 'desc';
        const sortedData = _.orderBy(data, 'payment', sortBy)
        this.setState({data: sortedData, sortByAsc: !this.state.sortByAsc})

    }

    onSortBy = (ref) => {
        const data = this.props.userdata.slice();
        const sortBy = this.state.sortByAsc ? 'asc' : 'desc';
        const sortedData = _.orderBy(data, ref, sortBy)
        this.setState({data: sortedData, sortByAsc: !this.state.sortByAsc})

    }


    save = ()=> {

        if (this.state.isEditMode) {
            const temp = this.props.userdata.slice();
            temp.splice(this.state.updateIndex, 1, this.state.fields)
            this.setState({data: temp, isDisableSaveButton: true})

        } else {

            this.props.onSave(this.state.fields)
        }


    }


    handleSelect = (args) => {
        this.setState({fields: args.fields})
    }


    isValidateItem = (isValid)=> {

        if (isValid) {
            this.setState({isDisableSaveButton: false})
        } else {
            this.setState({isDisableSaveButton: true})
        }
    }


    componentDidMount() {
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
console.log(this.props)
        if(!this.props.userdata) return <div></div>;

        return (<Grid fluid={true}>
                <Header onSortBy={this.onSortBy}/>
                {this.props.userdata.map((data, index)=>
                    <Transaction data={data}
                                 onDeleteRow={this.deleteRow}
                                 onChange={this.handleChange}
                                 onEdit={this.editRow}
                                 uniqueKey={data.key}
                                 onSelect={this.handleSelect}
                                 id={index}
                                 key={data.key}
                                 isValidItem={this.isValidateItem}

                    />)}
                <AddItem onChange={this.handleChange} onSelect={this.handleSelect}
                         isValidItem={this.isValidateItem}/>

                <Row className="saveRow">
                    <Col md={2} className="saveCol">
                        <Button bsStyle="primary" className="saveButton" disabled={this.state.isDisableSaveButton}
                                onClick={this.save}>Save</Button>
                    </Col>

                </Row>

            </Grid>
        )
    }

}


function mapStateToProps({user}) {
    console.log(user)
    if(!user) return ;
    const {userdata} = user
    return {
        userdata
    }

}

export default connect(mapStateToProps, null)(AddTransaction)