/**
 * This module contains the Redux store configurations.
 */

import redux from "@reduxjs/toolkit"
import {filterDepartmentReducer} from "./reducers/filter-reducer";


const photoCubeStore = redux.configureStore(
    {
        // Register reducers with the store.
        reducer: redux.combineReducers(
            {
                "filterDepartment": filterDepartmentReducer,
            }
        )
    }
)

export default photoCubeStore