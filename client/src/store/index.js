import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../context/reducers'

const store = configureStore({
    reducer: rootReducer,
    extension: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
})

export default store