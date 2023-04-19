import { combineReducers } from 'redux'
import { loginReducer } from "./loginReducers"

const rootReducer = combineReducers({
    login: loginReducer
});

export default rootReducer;