import React from 'react';
import '../../css/RightDock/RightDock.css';
import FileCount from './FileCount';
import BrowsingModeChanger, { BrowsingModes } from './BrowsingModeChanger';
import Dimensions from './Dimensions';
import PickedDimension from './PickedDimension';
import { FilterList } from './FilterList';
import { Filter } from '../Filter';

/**
 * RightDock is the right portion of the interface.
 * PhotoCubeClient.tsx contains: LeftDock, Middle, including Bottom Dock, and RightDock.
 */
export default class RightDock extends React.Component<{
        //Props contract:
        onDimensionChanged:(dimName: string, dimension:PickedDimension) => void,
        onBrowsingModeChanged:(browsingmode: BrowsingModes) => void,
        onClearAxis:(axisName: string) => void,
        hideControls: boolean,
        activeFilters: Filter[],
        onFilterRemoved: (filterId: number) => void
    }>{

    private fileCount = React.createRef<FileCount>();
    private browsingModeChanger = React.createRef<BrowsingModeChanger>();

    render(){
        let visibility: string = this.props.hideControls ? "hide" : "";
        return(
            <div id="RightDock">
                <FileCount className={visibility} ref={this.fileCount}/>
                <BrowsingModeChanger ref={this.browsingModeChanger} onBrowsingModeChanged={this.props.onBrowsingModeChanged} />
                <Dimensions className={visibility} activeFilters={this.props.activeFilters} onDimensionChanged={this.onDimensionChanged} onClearAxis={this.onClearAxis}/>
                <FilterList className ={visibility} activeFilters={this.props.activeFilters} onFilterRemoved={this.props.onFilterRemoved} />
            </div>
        );
    }

    onDimensionChanged = (dimName: string, dimension:PickedDimension) => {
        this.props.onDimensionChanged(dimName, dimension);
    }

    onClearAxis = (axisName: string) => {
        this.props.onClearAxis(axisName);
    }

    UpdateFileCount(count: number){
        this.fileCount.current!.UpdateFileCount(count);
    }

    ChangeBrowsingMode = (browsingMode:BrowsingModes) => {
        this.browsingModeChanger.current!.ChangeSelectedBrowsingMode(browsingMode);
    }
}