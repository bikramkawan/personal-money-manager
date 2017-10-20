/**
 * Created by bikramkawan on 10/20/17.
 */
import React, {Component} from 'react';
import {MONTHS} from '../../shared/constants'
import {connect} from 'react-redux';
import {filterData} from '../../actions'
const classes = require('classnames');

class FilterData extends Component {

    constructor() {
        super();
        this.state = {
            filterParam: {
                year: null,
                month: null,
                filterByYear: false,
                filterByMonth: false,
            }
        }


    }

    renderOptions(options) {
        return options.map((value, index) => <option key={index} id={index} value={value}>{value}</option>)

    }

    filterSelect = (ref, {target}) => {
        let {filterParam} = this.state;
        filterParam[ref] = parseFloat(target.value);
        this.setState({filterParam})
        this.props.filterData(filterParam)
    }


    handleCheckBox = ({target}) => {
        let {filterParam} = this.state;
        filterParam[target.value] = target.checked;
        if (!filterParam.filterByMonth) {
            filterParam.month = null;
            this.props.filterData(filterParam)
        }

        this.setState({filterParam})


    }


    render() {


        const {filterByYear, filterByMonth} = this.state.filterParam;

        return (
            <div className="filterdata-container">

                <div className="fields">

                                <span className="year">
                                    <input type="checkbox" name="filterByYear" value="filterByYear"
                                           onChange={this.handleCheckBox}
                                    />
                                Year </span>
                    <select
                        className={classes('form-control yearSelect', {hideMe: !filterByYear})}
                        id="sel1"
                        onChange={this.filterSelect.bind(this, 'year')}
                        style={{textTransform: 'Capitalize'}}>
                        {this.renderOptions(this.props.years)}
                    </select>

                </div>
                <div className="fields">

                               <span className={classes('month', {hideMe: !filterByYear})}>
                                   <input type="checkbox" name="filterByMonth" value="filterByMonth"
                                          onChange={this.handleCheckBox}
                                   />
                                Month </span> <select
                    className={classes('form-control monthSelect', {hideMe: !filterByMonth || !filterByYear})}
                    id="sel1"
                    onChange={this.filterSelect.bind(this, 'month')}
                    style={{textTransform: 'Capitalize'}}>
                    {this.renderOptions(MONTHS)}
                </select>
                </div>

            </div>





        )


    }


}


function mapStateToProps(state) {

    if (!state.user) return {};
    const {userdata, userid, years} = state.user

    return {
        userdata, userid, years: years || []
    }

}


export default connect(mapStateToProps, {filterData})(FilterData)