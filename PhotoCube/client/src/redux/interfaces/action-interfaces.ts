/**
 * This module contains Redux action interfaces.
 */

import {IFilter, IMediaObject} from "../../interfaces";
import {ViewModes} from "../../enums";

/**
 * The one interface to rule them all.
 */
interface IAction {
    type: string
}

export interface IFilterAction extends IAction {
    filter: IFilter
}

export interface IBrowsingStateAction extends IAction {
    loadingBrowsingState: boolean,
    viewMode?: ViewModes,
    error?: boolean,
    mediaObjects?: Array<IMediaObject>
}
