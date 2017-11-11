/**
 * Created by bikramkawan on 8/12/17.
 */
import React, {Component} from 'react';
import Header from './Header'
import Transaction from './TransactionRow'
import {Grid, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import {List} from 'react-virtualized';
import DataInputDialog from './DataInputDialog'
import FilterData from './FilterData'





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
            uniqueKey: null,
            filterParam: {
                year: null,
                month: null,
                filterByYear: false,
                filterByMonth: false,
            }

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

    showDialog = () => {

        this.setState({openModal: !this.state.openModal})

    }

    hideDialog = (value) => {
        this.setState({openModal: value})
    }


    render() {
        if (!this.props.userdata && this.props.years) return <div></div>;
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
                        <Col md={4} className='add-data' onClick={this.showDialog}> Add New Data </Col>
                        <Col md={2} className='filter-data'>Filter Data : </Col>
                        <Col md={6} className='filter-data'>
                            <FilterData/>
                        </Col>
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
    const {userdata, userid, years} = state.user

    return {
        userdata, userid, years
    }

}

export default connect(mapStateToProps, null)(Dashboard)