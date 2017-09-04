/**
 * Created by bikramkawan on 8/11/17.
 */

import {USER_LOGIN, USER_DATA} from '../shared/constants'
export const userLogin = (email,userid) => {
    console.log(email,userid)
    const action = {
        type: USER_LOGIN,
        email,
        userid
    }
    return action;
}