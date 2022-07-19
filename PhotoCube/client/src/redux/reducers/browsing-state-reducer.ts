/**
 * This module contains the browsing state reducer.
 */
import {IBrowsingStateDepartment} from "../interfaces/reducer-interfaces";
import {IBrowsingStateAction} from "../interfaces";
import {BrowsingStateActions} from "../actions/browsing-state-actions";

const BROWSING_STATE_DEPARTMENT: IBrowsingStateDepartment = {} as IBrowsingStateDepartment

const browsingStateDepartmentReducer = (
    department: IBrowsingStateDepartment = BROWSING_STATE_DEPARTMENT,
    action: IBrowsingStateAction
): IBrowsingStateDepartment => {

    // Deduce reducer operation.
    switch (action.type) {

        // Fetch media objects.
        case BrowsingStateActions.FETCH_MEDIA_OBJECTS:
            // TODO
            return department

        // Fetch media objects succeeded.
        case BrowsingStateActions.FETCH_MEDIA_OBJECT_SUCCEEDED:
            // TODO
            return department

        // Fetch media objects failed.
        case BrowsingStateActions.FETCH_MEDIA_OBJECT_FAILED:
            // TODO
            return department

        // Change view mode.
        case BrowsingStateActions.CHANGE_VIEW_MODE:
            // TODO
            return department

        // Unknown action type.
        default:
            return department
    }
}

export default browsingStateDepartmentReducer