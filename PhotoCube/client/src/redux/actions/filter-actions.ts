/**
 * This module contains actions for the filter store.
 */

import {IFilter} from "../../interfaces";
import {IAction} from "../interfaces";

// Action types.
export enum ActionTypes {
    FILTER_ADDED = "FILTER_ADDED",
    FILTER_REMOVED = "FILTER_REMOVED"
}

export const addFilter = (filter: IFilter): IAction => {
    return {
        type: ActionTypes.FILTER_ADDED,
        filter: filter
    }
}

export const removeFilter = (filter: IFilter): IAction => {
    return {
        type: ActionTypes.FILTER_REMOVED,
        filter: filter
    }
}
