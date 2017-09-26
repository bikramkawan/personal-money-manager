/**
 * Created by bikramkawan on 9/3/17.
 */
import {USER_LOGIN,USER_DATA} from '../shared/constants';

let user = {
    email: null
}

export default (state = null, action) => {

    switch (action.type) {

        case USER_LOGIN:
            const {email,userid,logged,userdata} = action;
            user = {email,userid,logged,userdata};
            return user;

        case  USER_DATA:
            const {userdata1}  = action;

            return {userdata1};

        default:
            return state;
    }


}




