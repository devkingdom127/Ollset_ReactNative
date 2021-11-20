import { USER_DATA1 } from '../constants';
const initialState = {
    user1: []
};
const user1Reducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_DATA1:
            return {
                ...state,
                user1:action.payload
            };
        default:
            return state;
    }
}
export default user1Reducer;