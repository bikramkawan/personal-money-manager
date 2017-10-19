/**
 * Created by bikramkawan on 8/11/17.
 */

import {FILTER_DATA, USER_LOGIN} from '../shared/constants'
export const userLogin = (email, userid,logged,userdata) => {

    const action = {
        type: USER_LOGIN,
        email,
        userid,
        logged,
        userdata
    }
    return action;
}

export const filterData = (param) => {
    const action = {
        type: FILTER_DATA,
        param
    }
    return action;
}