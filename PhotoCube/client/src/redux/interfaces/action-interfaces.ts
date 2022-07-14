/**
 * This module contains Redux action interfaces.
 */

import {IFilter} from "../../interfaces";

/**
 * The one interface to rule them all.
 */
export interface IAction {
    type: string,
    filter?: IFilter
}
