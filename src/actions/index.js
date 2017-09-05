/**
 * Created by bikramkawan on 8/11/17.
 */

import {USER_LOGIN} from '../shared/constants'
export const userLogin = (email, userid) => {
    const action = {
        type: USER_LOGIN,
        email,
        userid
    }
    return action;
}