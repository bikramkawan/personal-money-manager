/**
 * Created by bikramkawan on 8/12/17.
 */
import React, {Component} from 'react';
import Header from './Rows/Header'
import Transaction from './Rows/Transaction'
import AddItem from './Rows/AddItem';
import  {isSaved} from '../actions'
import {Grid, Row, Col, Button} from 'react-bootstrap';
import AlertDismissable from './AlertDismissable'
import * as _ from 'lodash';
import * as $ from 'jquery'


class AddTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            fields: {
                uniqueKey: '',
                date: '',
                payment: '',
                category: '',
                debit: '',
                credit: ''
            },
            isEditMode: false,
            updateData: {},


        }
        this.store = this.props.store;
    }

    editRow = (id) => {
        console.log(id)
        this.setState({isEditMode: true});

    }


    deleteRow = (uniqueKey) => {
        console.log(uniqueKey)
        const index = this.state.data.findIndex(d=>d._id === uniqueKey);
        const temp = this.state.data.slice();
        temp.splice(index, 1);
        this.setState({data: temp}, ()=>this.props.onDelete(uniqueKey))


    }
    handleChange = (args)=> {
        console.log(args)
        if (!_.isUndefined(args.uniqueKey)) {
            const index = this.state.data.findIndex(d=>d._id === args.uniqueKey);
            const temp = this.state.data.slice();
            const obj = temp[index];

            const updateObj = {...obj, [args.ref]: args.value};

            this.setState({
                updateData: {
                    index: index,
                    data: updateObj
                }
            }, ()=>this.props.onUpdate(args.uniqueKey, updateObj))
            console.log(this.state)

        }

        const fields = {...this.state.fields, [args.ref]: args.value}

        this.setState({fields: fields})


    }


    save = ()=> {

        if (this.state.isEditMode) {
            const temp = this.state.data.slice();
            temp.splice(this.state.updateData.index, 1, this.state.updateData.data)

            this.setState({data: temp, isEditMode: false})

        } else {
            const temp = this.state.data;
            temp.push(this.state.fields)
            this.setState({data: temp}, ()=>this.props.onSave(this.state.fields))
        }

        this.store.dispatch(isSaved());
        $('.alertMessage').show();
    }


    render() {

        return (<Grid fluid={true}>
                <Header/>
                {this.state.data.map((data, index)=>
                    <Transaction data={data} onDeleteRow={this.deleteRow}
                                 onChange={this.handleChange}
                                 onEdit={this.editRow}
                                 store={this.props.store}
                                 uniqueKey={data._id}
                                 id={index}
                                 key={data._id}
                    />)}
                <AddItem onChange={this.handleChange}/>

                <Row className="alertMessage">
                    <Col md={4} className="saveCol">
                        <AlertDismissable/>
                    </Col>
                </Row>


                <Row className="saveRow">
                    <Col md={2} className="saveCol">
                        <Button bsStyle="primary" className="saveButton" onClick={this.save}>Save</Button>
                    </Col>

                </Row>
            </Grid>
        )
    }

}

export default AddTransaction