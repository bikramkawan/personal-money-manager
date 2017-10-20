/**
 * Created by bikramkawan on 9/3/17.
 */
import {USER_LOGIN, FILTER_DATA} from '../shared/constants';
import moment from 'moment';
import * as _ from 'lodash';

const initialState = {
    email: null,
    userid: null,
    userdata: [],
    allData: []
}

export default (state = initialState, action) => {
    switch (action.type) {

        case USER_LOGIN:
            const {email, userid, logged, userdata} = action;
            const years = getUniqueYears(userdata);
            return {...state, email, userid, logged, userdata, allData: userdata, years};

        case  FILTER_DATA:
            let filtered = state.allData.slice();

            const {filterByYear, filterByMonth, year, month} = action.filterParam;

            if (filterByYear && year) {
                filtered = filtered.filter(d => moment.unix(d.date).year() === year);
            }
            if (filterByYear && filterByMonth && year && month) {
                filtered = filtered.filter(d => moment.unix(d.date).year() === year && moment.unix(d.date).month() === month - 1)
            }

            return {...state, userdata: filtered};

        default:
            return state;
    }


}


function getUniqueYears(data) {
    return ['All'].concat(_.uniq(data.map(d => moment.unix(d.date).year())))


}

