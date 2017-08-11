/**
 * Created by bikramkawan on 8/11/17.
 */

const initialState = {

    isEditMode: false
}

export default (state = initialState, action) => {

    switch (action) {

        case 'saved':
            return true;

        default:
            return true;




    }

}