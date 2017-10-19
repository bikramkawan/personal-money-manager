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
    console.log(state)
    switch (action.type) {

        case USER_LOGIN:
            const {email, userid, logged, userdata} = action;
            const years = getUniqueYears(userdata);
            return {...state, email, userid, logged, userdata, allData: userdata, years};

        case  FILTER_DATA:
            let filtered = state.allData.slice();
            console.log(action)
            if (!isNaN(action.param)) {
                filtered = filtered.filter(d=>moment.unix(d.date).year() === action.param.year);
            }

            return {...state, userdata: filtered};

        default:
            return state;
    }


}


function getUniqueYears(data) {
    return ['All'].concat(_.uniq(data.map(d=>moment.unix(d.date).year())))


}

