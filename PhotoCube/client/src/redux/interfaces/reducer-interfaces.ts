import {
    IHierarchy,
    IProjectionDimension,
    ITag,
    ITagset
} from "../../interfaces";

/**
 * This module contains interfaces used by the Redux Reducers.
 */

// Structure of the Filter department found within the Redux Store.
export interface IFilterDepartment {
    tags: Set<ITag>,
    tagsets: Set<ITagset>,
    hierarchies: Set<IHierarchy>,
    projectionDimensions: Set<IProjectionDimension>,
}
