/**
 * Created by bikramkawan on 8/12/17.
 */
import React, {Component} from 'react';
import Header from './Rows/Header'
import Transaction from './Rows/Transaction'
import AddItem from './Rows/AddItem';
import {Grid, Row, Col, Button} from 'react-bootstrap';

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

        const index = this.state.data.findIndex(d=>d.key === uniqueKey);
        const temp = this.state.data.slice();
        temp.splice(index, 1);
        this.setState({data: temp}, ()=>this.props.onDelete(uniqueKey))


    }
    handleChange = (args)=> {

        this.setState({fields: args.fields})


    }
    onSortByName = () => {
        const data = this.state.data.slice();
        const sortBy = this.state.sortByAsc ? 'asc' : 'desc';
        const sortedData = _.orderBy(data, 'payment', sortBy)
        this.setState({data: sortedData, sortByAsc: !this.state.sortByAsc})

    }

    onSortBy = (ref) => {
        const data = this.state.data.slice();
        const sortBy = this.state.sortByAsc ? 'asc' : 'desc';
        const sortedData = _.orderBy(data, ref, sortBy)
        this.setState({data: sortedData, sortByAsc: !this.state.sortByAsc})

    }


    save = ()=> {

        if (this.state.isEditMode) {
            const temp = this.state.data.slice();
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


    render() {
        return (<Grid fluid={true}>
                <Header onSortBy={this.onSortBy}/>
                {this.state.data.map((data, index)=>
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

export default AddTransaction