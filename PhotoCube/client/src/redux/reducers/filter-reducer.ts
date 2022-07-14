/**
 * This module contains the filter reducer.
 */

import {IAction, IFilterDepartment} from "../interfaces";
import {ActionTypes} from "../actions/filter-actions";
import {FilterTypes} from "../../enums";
import {LOGGER} from "../../utils/logger";


// Filter department of the Redux store.
const FILTER_DEPARTMENT: IFilterDepartment = {} as IFilterDepartment

/**
 * Add a new filter to a department
 * @param department The department to extend
 * @param action The action containing the filter to be added
 */
const addFilterToDepartment = (
    department: IFilterDepartment,
    action: IAction
): IFilterDepartment => {

    // Deduce the type of the filter to add.
    switch (action.filter?.filterType) {

        // Add a tag filter to the department.
        case FilterTypes.TagFilter:
            return {
                ...department,
                tags: department
                    .tags
                    .add(action.filter)
            }

        // Add a tagset filter to the department.
        case FilterTypes.TagsetFilter:
            const reModeledDepartment = {
                ...department,
                tagsets: department
                    .tagsets
                    .add(action.filter)
            }
            LOGGER.debug(reModeledDepartment)
            return reModeledDepartment

        // Add a hierarchy filter to the department.
        case FilterTypes.HierarchyFilter:
            return {
                ...department,
                hierarchies: department
                    .hierarchies
                    .add(action.filter)
            }

        // Action did not contain a legal filter type.
        default:
            LOGGER.warn(
                "FilterType "
                + `${action.filter?.filterType} `
                + "not recognised; "
                + "Proceeding without changes to the store"
            )
            LOGGER.groupEnd()
            return department
    }
}

export const filterReducer = (
    department: IFilterDepartment = FILTER_DEPARTMENT,
    action: IAction
): IFilterDepartment => {

    // Open a log group.
    LOGGER.group("FilterReducer")

    // Deduce reducer operation.
    switch (action.type) {

        // Adding a filter.
        case ActionTypes.FILTER_ADDED:
            return addFilterToDepartment(department, action)

        // Unknown action type.
        default:
            LOGGER.warn(
                "ActionType "
                + `${action.type} `
                + "not recognised; "
                + "Proceeding without changes to the store"
            )
            LOGGER.groupEnd()
            return department
    }
}