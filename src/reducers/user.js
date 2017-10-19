/**
 * Created by bikramkawan on 9/3/17.
 */
import {USER_LOGIN, USER_DATA} from '../shared/constants';
import moment from 'moment';

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
            return {...state, email, userid, logged, userdata, allData: userdata};

        case  USER_DATA:
            const filtered = state.allData.slice().filter(d=>moment.unix(d.date).year()>2011);
            return {...state, userdata: filtered};

        default:
            return state;
    }


}




