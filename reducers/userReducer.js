import { USER_SAVE } from '../constants';
import { EMAIL } from '../constants';
const initialState = {
    user: []
};
const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_SAVE:
            return {
                ...state,
                user:action.payload
            };
        default:
            return state;
    }
}
export default userReducer;