import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { createWrapper } from "next-redux-wrapper"
import {reducer} from "@redux_state/rootReducer"
const middleware = [thunk]
const makeStore = () => createStore(reducer, compose(applyMiddleware(...middleware)))
export const wrapper = createWrapper(makeStore)