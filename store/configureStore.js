import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import user1Reducer from '../reducers/user1Reducer';
import user2Reducer from '../reducers/user2Reducer';
const rootReducer = combineReducers(
    { 
        user: userReducer,
        user1: user1Reducer,
        user2: user2Reducer
    }
);
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;