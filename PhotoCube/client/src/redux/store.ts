/**
 * This module contains the Redux store configurations.
 */

import {addFilter, removeFilter} from "./actions/filter-actions"
import redux from "@reduxjs/toolkit"
import filterDepartmentReducer from "./reducers/filter-reducer";
import {logger} from "./middleware";

// The Redux store.
const photoCubeStore = redux.configureStore(
    {
        // Register reducers with the store.
        reducer: redux.combineReducers(
            {
                "filterDepartment": filterDepartmentReducer,
            }
        ),

        // Register middleware with the store.
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware()
                .concat(logger)
        }
    }
)


// Register actions available for dispatching.
const DispatchActions = redux.bindActionCreators(
    {
        // Filter actions.
        addFilter,
        removeFilter,

        // Settings actions.

        // Browsing state actions.
    },
    photoCubeStore.dispatch
)

export default DispatchActions