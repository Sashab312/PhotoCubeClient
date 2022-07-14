/**
 * This module contains actions for the filter store.
 */

import {IFilter} from "../../interfaces";
import {IAction} from "../interfaces/action-interfaces";

// Action types.
export enum ActionTypes {
    FILTER_ADDED = "FILTER_ADDED"
}

export const addFilter = (filter: IFilter): IAction => {
    return {
        type: ActionTypes.FILTER_ADDED,
        filter: filter
    }
}
