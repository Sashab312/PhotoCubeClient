import {FilterTypes} from "../enums";

export interface IFilter {
    id: number,
    name: string,
    filterType: FilterTypes
}
