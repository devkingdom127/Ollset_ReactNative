import { USER_DATA2 } from '../constants';
const initialState = {
    user2: []
};
const user2Reducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_DATA2:
            console.log(action);
            return {
                ...state,
                user2:action.payload
            };
        default:
            return state;
    }
}
export default user2Reducer;