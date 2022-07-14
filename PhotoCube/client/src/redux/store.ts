/**
 * This module contains the Redux store configurations.
 */

import redux from "@reduxjs/toolkit"
import {filterReducer} from "./reducers/filter-reducer";


const store = redux.configureStore(
    {
        // Register the reducers with the store.
        reducer: redux.combineReducers(
            {
                "filterDepartment": filterReducer,
            }
        )
    }
)

export default store