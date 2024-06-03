import { combineReducers } from 'redux'
import darkModeReducer from '../reducers/darkModeReducer'

const rootReducer = combineReducers({
    darkMode: darkModeReducer,
})

export default rootReducer