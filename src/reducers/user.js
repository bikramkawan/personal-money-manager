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
            const {email,userid,logged} = action;
            user = {email,userid,logged};
            return user;

        case  USER_DATA:
            const {userdata}  = action;

            return {userdata};

        default:
            return state;
    }


}




