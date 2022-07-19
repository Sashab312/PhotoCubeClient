/**
 * This module contains interfaces used by the Redux Reducers.
 */

import {
    IHierarchy, IMediaObject,
    IProjectionDimension,
    ITag,
    ITagset
} from "../../interfaces";
import {ViewModes} from "../../enums";

// Structure of the Filter department found within the Redux Store.
export interface IFilterDepartment {
    tags: Set<ITag>,
    tagsets: Set<ITagset>,
    hierarchies: Set<IHierarchy>,
    projectionDimensions: Set<IProjectionDimension>,
}

// Structure of the BrowsingState department found within the Redux store.
export interface IBrowsingStateDepartment {
    loadingBrowsingState: boolean,
    loadingError: string,
    viewMode: ViewModes,
    mediaObjects: Array<IMediaObject>
}