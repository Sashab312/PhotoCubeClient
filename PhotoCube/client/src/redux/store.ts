/**
 * This module contains the Redux store configurations.
 */

import FilterActions from "./actions/filter-actions"
import redux from "@reduxjs/toolkit"
import filterDepartmentReducer from "./reducers/filter-reducer";
import browsingStateDepartmentReducer from "./reducers/browsing-state-reducer";
import {Logger} from "./middleware";
import Thunk from "redux-thunk"

// The Redux store.
const photoCubeStore = redux.configureStore(
    {
        // Register reducers with the store.
        reducer: redux.combineReducers(
            {
                "filterDepartment": filterDepartmentReducer,
                "browsingStateDepartment": browsingStateDepartmentReducer
            }
        ),

        // Register middleware with the store.
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware()
                .concat(Logger)
                .concat(Thunk)
        }
    }
)


// Register actions available for dispatching.
const DispatchActions = redux.bindActionCreators(
    {
        ...FilterActions
    },
    photoCubeStore.dispatch
)

export default DispatchActions