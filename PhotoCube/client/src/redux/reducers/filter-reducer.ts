/**
 * This module contains the filter reducer.
 */

import {IFilterAction, IFilterDepartment} from "../interfaces";
import {FilterActions} from "../actions/filter-actions";
import {FilterTypes} from "../../enums";
import {IFilter} from "../../interfaces";


// Filter department of the Redux store.
const FILTER_DEPARTMENT: IFilterDepartment = {} as IFilterDepartment

/**
 * Add a new filter to a department
 * @param department The department to extend
 * @param action The action containing the filter to be added
 */
const _addFilterToDepartment = (
    department: IFilterDepartment,
    action: IFilterAction
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
            return {
                ...department,
                tagsets: department
                    .tagsets
                    .add(action.filter)
            }

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
            return department
    }
}

/**
 * Remove a new filter to a department
 * @param department The department to remove a filter from
 * @param action The action containing the filter to be removed
 */
const _removeFilterFromDepartment = (
    department: IFilterDepartment,
    action: IFilterAction
): IFilterDepartment => {

    // Deduce the type of the filter to remove.
    switch (action.filter?.filterType) {

        // Remove a tag filter from the department.
        case FilterTypes.TagFilter:
            department.tags.delete(action.filter)
            return {
                ...department,
            }

        // Remove a tagset filter from the department.
        case FilterTypes.TagsetFilter:
            department.tagsets.delete(action.filter)
            return {
                ...department,
            }

        // Remove a hierarchy filter from the department.
        case FilterTypes.HierarchyFilter:
            department.hierarchies.delete(action.filter)
            return {
                ...department,
            }

        // Action did not contain a legal filter type.
        default:
            return department
    }
}

const filterDepartmentReducer = (
    department: IFilterDepartment = FILTER_DEPARTMENT,
    action: IFilterAction
): IFilterDepartment => {

    // Deduce reducer operation.
    switch (action.type) {

        // Add a filter.
        case FilterActions.FILTER_ADDED:
            return _addFilterToDepartment(department, action)

        // Remove a filter.
        case FilterActions.FILTER_REMOVED:
            return _removeFilterFromDepartment(department, action)

        // Unknown action type.
        default:
            return department
    }
}

export default filterDepartmentReducer