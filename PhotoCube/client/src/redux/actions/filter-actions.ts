/**
 * This module contains actions for the filter department.
 */

import {IFilter} from "../../interfaces";
import {IFilterAction} from "../interfaces";
import {FilterActions} from "../enums";


const addFilter = (filter: IFilter): IFilterAction => {
    return {
        type: FilterActions.FILTER_ADDED,
        filter: filter
    }
}

const applyFilters = () => {
}

const removeFilter = (filter: IFilter): IFilterAction => {
    return {
        type: FilterActions.FILTER_REMOVED,
        filter: filter
    }
}
const actions = {addFilter, applyFilters, removeFilter}
export default actions
