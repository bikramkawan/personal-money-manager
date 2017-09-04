/**
 * Created by bikramkawan on 9/3/17.
 */
import {USER_LOGIN} from '../shared/constants';

let user = {
    email: null
}

export default (state = null, action) => {

    switch (action.type) {

        case USER_LOGIN:
            const {email,userid} = action;
            user = {email,userid};
            return user;

        default:
            return state;
    }


}