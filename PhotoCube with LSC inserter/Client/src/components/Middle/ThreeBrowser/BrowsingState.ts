import PickedDimension from "../../RightDock/PickedDimension";

/**
 * Interface for object representing a previous ThreeBrowser Browsing State.
 */
export interface BrowsingState{
    xAxisPickedDimension: PickedDimension|null;
    yAxisPickedDimension: PickedDimension|null;
    zAxisPickedDimension: PickedDimension|null;
    cameraState: string;
}