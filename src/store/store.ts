import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {people} from "./reducer/Reducer";


// Combine reducers
const rootReducer = combineReducers({
    reducer: people
})


// Create store
export const store = createStore(rootReducer, applyMiddleware(thunk))


// Global state type
export type GlobalStateType = ReturnType<typeof rootReducer>


//@ts-ignore for debugging in devtools
window.store = store
