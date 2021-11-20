import { USER_SAVE } from '../constants';
import { EMAIL } from '../constants';
export function saveUser(user) {
    return {
        type: USER_SAVE,
        payload: user
    }
}