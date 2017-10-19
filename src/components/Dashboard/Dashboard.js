/**
 * Created by bikramkawan on 8/12/17.
 */
import React, {Component} from 'react';
import Header from './Header'
import Transaction from './TransactionRow'
import AddItem from './AddTransaction';
import {Grid, Row, Col, Button, Glyphicon} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import moment from 'moment'
import {List} from 'react-virtualized';
import {userdata} from '../../config/Firebase';
import DataInputDialog from './DataInputDialog'

const Papa = require('papaparse');

class Dashboard extends Component {

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
            openModal: false,
            sortRef: null,
            uniqueKey: null

        }

        this.store = this.props.store;
    }

    editRow = (uniqueKey, fields) => {
        this.setState({isEditMode: true, openModal: true, fields, uniqueKey});


        //  this.props.onUpdate(uniqueKey, this.state.fields)


    }


    deleteRow = (uniqueKey) => {

        const index = this.props.userdata.findIndex(d => d.key === uniqueKey);
        const temp = this.props.userdata.slice();
        temp.splice(index, 1);
        this.setState({data: temp}, () => this.props.onDelete(uniqueKey))


    }
    handleChange = (args) => {
        this.setState({fields: args.fields})


    }
    onSortByName = () => {
        const data = this.props.userdata.slice();
        const sortBy = this.state.sortByAsc ? 'asc' : 'desc';
        const sortedData = _.orderBy(data, 'payment', sortBy)
        this.setState({data: sortedData, sortByAsc: !this.state.sortByAsc})

    }

    onSortBy = (ref) => {
        this.setState({sortRef: ref, sortByAsc: !this.state.sortByAsc})
        this.renderRow();
    }


    save = (uniqueKey) => {

        // if (this.state.isEditMode) {
        //     const temp = this.props.userdata.slice();
        //     temp.splice(this.state.updateIndex, 1, this.state.fields)
        //     this.setState({data: temp, isDisableSaveButton: true})
        //
        // } else {
        //
        //     this.props.onSave(this.state.fields)
        // }
        if (uniqueKey) {
            this.props.onUpdate(uniqueKey, this.state.fields)
        } else {
            this.props.onSave(this.state.fields)
        }

        // this.props.onUpdate(uniqueKey, this.state.fields)

    }


    handleSelect = (args) => {
        this.setState({fields: args.fields})
    }


    isValidateItem = (isValid) => {

        if (isValid) {
            this.setState({isDisableSaveButton: false})
        } else {
            this.setState({isDisableSaveButton: true})
        }
    }


    rowRenderer = ({
                       key,         // Unique key within array of rows
                       index,       // Index of row within collection
                       isScrolling, // The List is currently being scrolled
                       isVisible,   // This row is visible within the List (eg it is not an overscanned row)
                       style,       // Style object to be applied to row (to position it)
                       sort
                   }) => {

        let data = _(this.props.userdata.slice()).reverse().value();
        if (this.state.sortRef) {
            const sortBy = this.state.sortByAsc ? 'asc' : 'desc';

            //https://stackoverflow.com/questions/41338449/lodash-sort-array-of-objects-prioritizing-alphabets-first-followed-by-numbers
            data = _.chain(_.partition(data.slice(), i => !isNaN(i[this.state.sortRef])))
                .flatMap(p => _.orderBy(p, this.state.sortRef, sortBy)).value();

        }

        return (

            <div className="list-row"
                 key={key}
                 style={style}
            >

                <Transaction data={data[index]}
                             onClick={this.showDialog}
                             onDeleteRow={this.deleteRow}
                             onChange={this.handleChange}
                             onEdit={this.editRow}
                             uniqueKey={data[index].key}
                             onSelect={this.handleSelect}
                             id={index}
                             key={data[index].key}
                             isValidItem={this.isValidateItem}

                />
            </div>
        )


    }

    renderRow() {
        console.log(this.props.height, this.props.width)
        return (<List
            width={this.props.width}
            height={this.props.height - 80}
            rowCount={this.props.userdata.length}
            rowHeight={52}
            rowRenderer={this.rowRenderer}
            overscanRowCount={2}
            sort={this.state.sortByAsc}
        />)
    }


    handleUpload = (evt) => {

        console.log(evt.target.files)
        const that = this;
        that.userRef = userdata.child(this.props.userid);
        console.log(this.props.userid)
        const file = evt.target.files[0]

        // Read the file as text
        Papa.parse(file, {
            header: true,
            complete: function (d) {
                const formatted = d.data.map((item) => {
                    const {date, payment, debit, credit} = item;
                    let newObj = {
                        date: moment(date).format('X'),
                        payment,
                        debit: isNaN(parseFloat(debit)) ? '-' : parseFloat(debit),
                        credit: isNaN(parseFloat(credit)) ? '-' : parseFloat(credit)
                    };
                    if (item.category === 'BUSINESS - Other') {
                        newObj = {...newObj, category: {parent: 'business', child: 'lend'}}

                    } else if (item.category === 'Concerts/Plays') {
                        newObj = {...newObj, category: {parent: 'entertainment', child: 'concert'}}

                    }
                    else if (item.category === 'Groceries') {
                        newObj = {...newObj, category: {parent: 'food', child: 'groceries'}}

                    }
                    else if (item.category === 'FOOD - Other') {
                        newObj = {...newObj, category: {parent: 'food', child: 'alcohol'}}

                    }
                    else if (item.category === 'Bus/Taxi/Train Fare') {
                        newObj = {...newObj, category: {parent: 'transportation', child: 'public'}}

                    }
                    else if (item.category === 'Education') {
                        newObj = {...newObj, category: {parent: 'dailyliving', child: 'education'}}

                    }
                    else if (item.category === 'Phone') {
                        newObj = {...newObj, category: {parent: 'utilities', child: 'phone'}}

                    }
                    else if (item.category === 'Wages & Tips') {
                        newObj = {...newObj, category: {parent: 'income', child: 'salary'}}

                    }

                    else if (item.category === 'Mortgage/Rent') {
                        newObj = {...newObj, category: {parent: 'housing', child: 'rent'}}

                    }
                    else if (item.category === 'Internet') {
                        newObj = {...newObj, category: {parent: 'utilities', child: 'internet'}}

                    }
                    else if (item.category === 'INCOME-Other') {
                        newObj = {...newObj, category: {parent: 'income', child: 'freelance'}}

                    }
                    else if (item.category === 'SAVINGS -Other') {
                        newObj = {...newObj, category: {parent: 'savings', child: 'investments'}}

                    }
                    else if (item.category === 'Personal Supplies') {
                        newObj = {...newObj, category: {parent: 'dailyliving', child: 'personal'}}

                    }
                    else if (item.category === 'Clothing') {
                        newObj = {...newObj, category: {parent: 'dailyliving', child: 'clothing'}}

                    }
                    else if (item.category === 'Dining/Eating Out') {
                        newObj = {...newObj, category: {parent: 'food', child: 'eatingoutside'}}

                    }
                    else if (item.category === "UTILITIES - Other") {
                        newObj = {...newObj, category: {parent: 'utilities', child: 'other'}}

                    }
                    else if (item.category === "MISC - Other") {
                        newObj = {...newObj, category: {parent: 'miscellaneous', child: 'other'}}

                    }
                    else if (item.category === "Medicine/Drugs") {
                        newObj = {...newObj, category: {parent: 'health', child: 'medicine'}}

                    }
                    else if (item.category === "Movies/Theater") {
                        newObj = {...newObj, category: {parent: 'entertainment', child: 'movies'}}

                    }
                    else if (item.category === "Refunds/Reimbursements") {
                        newObj = {...newObj, category: {parent: 'income', child: 'refunds'}}

                    }
                    else if (item.category === "Vacation/Travel") {
                        newObj = {...newObj, category: {parent: 'entertainment', child: 'vacation'}}

                    }
                    else if (item.category === "Gifts") {
                        newObj = {...newObj, category: {parent: 'income', child: 'gifts'}}

                    }
                    else if (item.category === "Gas/Oil") {
                        newObj = {...newObj, category: {parent: 'utilities', child: 'gas'}}

                    }
                    else if (item.category === "Laundry / Dry Cleaning") {
                        newObj = {...newObj, category: {parent: 'dailyliving', child: 'laundry'}}

                    }
                    else if (item.category === "Financial Aid") {
                        newObj = {...newObj, category: {parent: 'income', child: 'financialAid'}}

                    }
                    else if (item.category === "phone") {
                        newObj = {...newObj, category: {parent: 'utilities', child: 'phone'}}

                    }
                    else if (item.category === "Cleaning Services") {
                        newObj = {...newObj, category: {parent: 'dailyliving', child: 'cleaning'}}

                    }
                    else if (item.category === "FoOD - Other") {
                        newObj = {...newObj, category: {parent: 'food', child: 'alcohol'}}

                    }
                    else if (item.category === "wages & Tips") {
                        newObj = {...newObj, category: {parent: 'income', child: 'salary'}}

                    }
                    else if (item.category === "InCOME-Other") {
                        newObj = {...newObj, category: {parent: 'income', child: 'freelance'}}

                    }
                    else if (item.category === "Gifts Received") {
                        newObj = {...newObj, category: {parent: 'income', child: 'gifts'}}

                    } else {
                        newObj = {...newObj, category: {parent: 'miscellaneous', child: 'other'}}

                    }

                    return newObj;
                    // console.log(newObj)


                })

                console.log(formatted)
                // formatted.forEach(function (e, i) {
                //     const temp = that.userRef.push();
                //     // console.log(temp.key,i)
                //     temp.set(e)
                //     //   console.log(temp.key,i,'after')
                // })


            }
        })


    }


    showDialog = () => {

        this.setState({openModal: !this.state.openModal})

    }

    hideDialog = (value) => {
        this.setState({openModal: value})
    }

    renderOptions(param) {

        const {userdata} = this.props;
        const years = _.uniq(userdata,(y)=>moment.unix(y.date).year());
        console.log(years)
        years.map(e=> console.log(moment.unix(e.date).year()))
        // return <optgroup label={d} key={d}>
        //     {values.map((value, main) => <option key={main} id={d} value={value}>{value}</option>)}
        // </optgroup>

    }

    render() {
        if (!this.props.userdata) return <div></div>;
        let classList = this.state.openModal ? 'transaction-container disable' : 'transaction-container';

        return (<div>

                {this.state.openModal && <DataInputDialog {...this.props}
                                                          onChange={this.handleChange}
                                                          onEdit={this.state.isEditMode}
                                                          hideDialog={this.hideDialog}
                                                          data={this.state.fields}
                                                          onSave={this.save}
                                                          uniqueKey={this.state.uniqueKey}


                />

                }


                <Grid className={classList} fluid={true} style={{width: this.props.width}}>

                    <Row className='add-modal-header'>
                        <Col md={6} className='add-data' onClick={this.showDialog}> Add New Data </Col>
                        <Col md={2} className='filter-data'>Filter Data : </Col>
                        <Col md={4} className='filter-data'> <select className="form-control" id="sel1"
                                                                     onChange={this.handleSelect}
                                                                     style={{textTransform: 'Capitalize'}}>
                            {this.renderOptions('Year')}
                        </select></Col>
                    </Row>
                    <Header onSortBy={this.onSortBy}/>
                    {this.renderRow()}

                </Grid>
            </div>
        )
    }

}


function mapStateToProps(state) {

    if (!state.user) return {};
    const {userdata, userid} = state.user
    console.log(moment.unix(userdata[0].date).year(), userdata[0].date)
    return {
        userdata, userid
    }

}

export default connect(mapStateToProps, null)(Dashboard)