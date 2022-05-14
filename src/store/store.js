import { createStore } from "redux";
import { stateReducer } from "./reducers";


export const store = createStore(stateReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())