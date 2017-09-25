/**
 * Created by bikramkawan on 8/11/17.
 */

import {USER_DATA, USER_LOGIN} from '../shared/constants'
export const userLogin = (email, userid,logged) => {
console.log(email,userid,logged)
    const action = {
        type: USER_LOGIN,
        email,
        userid,
        logged
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