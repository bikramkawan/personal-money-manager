/**
 * Created by bikramkawan on 8/11/17.
 */

import {USER_DATA, USER_LOGIN} from '../shared/constants'
export const userLogin = (email, userid) => {
    const action = {
        type: USER_LOGIN,
        email,
        userid
    }
    return action;
}

export const userData = (userdata) => {
    const action = {
        type: USER_DATA,
        userdata
    }
    return action;
}