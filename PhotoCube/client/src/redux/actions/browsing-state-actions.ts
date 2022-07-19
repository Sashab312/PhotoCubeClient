/**
 * This module contains actions for the browsing state department.
 */

import {ViewModes} from "../../enums";
import {IBrowsingStateAction} from "../interfaces";

export enum BrowsingStateActions {
    FETCH_MEDIA_OBJECTS = "FETCH_MEDIA_OBJECTS",
    FETCH_MEDIA_OBJECT_SUCCEEDED = "FETCH_MEDIA_OBJECTS_SUCCEEDED",
    FETCH_MEDIA_OBJECT_FAILED = "FETCH_MEDIA_OBJECTS_FAILED",
    CHANGE_VIEW_MODE = "CHANGE_VIEW_MODE"
}

export const fetchMediaObjects = (): IBrowsingStateAction => {
    const status = true

    if (status)
        return {
            type: BrowsingStateActions.FETCH_MEDIA_OBJECT_SUCCEEDED,
            loadingBrowsingState: false
        }
    else
        return {
            type: BrowsingStateActions.FETCH_MEDIA_OBJECT_FAILED,
            loadingBrowsingState: false
        }
}
export const changeViewMode = (viewMode: ViewModes): IBrowsingStateAction => {
    return {
        type: BrowsingStateActions.CHANGE_VIEW_MODE,
        loadingBrowsingState: true,
        viewMode: viewMode
    }
}