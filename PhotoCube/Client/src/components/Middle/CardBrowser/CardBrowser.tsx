import React, { Component, SyntheticEvent } from "react";
import CubeObject from "../CubeBrowser/CubeObject";
import Fetcher from "../CubeBrowser/Fetcher";
import "../../../css/CardBrowser.css";
import { BrowsingModes } from "../../RightDock/BrowsingModeChanger";
import Tag from "../CubeBrowser/Tag";
import { env } from "process";

/**
 * The CardBrowser allows the user to browse each photo one by one.
 */
export default class CardBrowser extends React.Component<{
  cubeObjects: CubeObject[];
  onBrowsingModeChanged: (browsingMode: BrowsingModes) => void;
}> {
  state = {
    photoIndex: 0,
    currentPhotoClassName: "",
    spinnerVisibility: "hidden",
    photoVisibility: "visible",
    tagNamesWithCubeObjectId: [],
    imagesInCell: [],
  };

  render() {
    if (this.state.imagesInCell.length > 0) {
      let fileName: string = "";
      if (this.state.imagesInCell[this.state.photoIndex]["fileURI"]) {
        fileName = this.state.imagesInCell[this.state.photoIndex]["fileURI"]!;
      }
      return (
        <div className="grid-item cardBrowserContainer">
          <div>
            <p>
              {"Showing photo: " +
                (this.state.photoIndex + 1) +
                " out of " +
                this.state.imagesInCell.length}
            </p>
            <br />
            <p>Filename: {fileName}</p>
            <br />
            <div className="taglist container">
              <p>Tags:</p>
              <ul className="taglist cardmode">
                {this.state.tagNamesWithCubeObjectId.map((tag) => (
                  <li>{tag}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="currentPhotoContainer">
            <img
              id="currentPhoto"
              className={
                this.state.currentPhotoClassName +
                " " +
                this.state.photoVisibility
              }
              onLoad={(e) => this.onImageLoad(e)}
              src={
                process.env.REACT_APP_IMAGE_SERVER +
                this.state.imagesInCell[this.state.photoIndex]["fileURI"]
              }
            ></img>
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid-item cardBrowserContainer currentPhotoContainer">
          <p>Please choose some photos first.</p>
        </div>
      );
    }
  }

  /**
   * Get's tags associated with each and updates state.
   */
  /*   private async updateTagsInState() {
        if(this.props.cubeObjects.length > 0){
            await Fetcher.FetchTagsWithCubeObjectId(this.props.cubeObjects[this.state.photoIndex].Id)
            .then((tags:string[]) => {
                this.setState({tagNamesWithCubeObjectId: tags})
            });
        }   
        console.log(this.props.cubeObjects[this.state.photoIndex].Id);
    } */

  private async updateTagsInState() {
    if (this.state.imagesInCell.length > 0) {
      await Fetcher.FetchTagsWithCubeObjectId(
        this.state.imagesInCell[this.state.photoIndex]["id"]
      ).then((tags: string[]) => {
        this.setState({ tagNamesWithCubeObjectId: tags });
      });
    }
  }

  private async fetchAllImages() {
    await Fetcher.FetchAllImages().then((images: Object[]) => {
      this.setState({ imagesInCell: images });
    });
  }

  private async updateTagsAndFectImages() {
    try {
      await this.fetchAllImages();
      await this.updateTagsInState();
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", (e) => this.onKeydown(e));
    this.updateTagsAndFectImages();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", (e) => this.onKeydown(e));
  }

  /**
   * Showing spinner, however images are loaded too fast for the spinner to show.
   * @param e
   */
  onImageLoad(e: SyntheticEvent<HTMLImageElement, Event>) {
    this.setState({ spinnerVisibility: "hidden" });
    if (e.currentTarget.naturalWidth > e.currentTarget.naturalHeight) {
      this.setState({ currentPhotoClassName: "landscape" });
    } else {
      this.setState({ currentPhotoClassName: "portrait" });
    }
    this.setState({ photoVisibility: "visible" });
  }

  onLoadStart(e: SyntheticEvent<HTMLImageElement, Event>) {
    this.setState({ photoVisibility: "hidden" });
    this.setState({ spinnerVisibility: "visible" });
  }

  /**
   * Left arrow, Right arrow and Escape controls.
   * @param e
   */
  onKeydown(e: KeyboardEvent) {
    //console.log(e.key);
    if (e.key === "ArrowRight") {
      if (this.state.photoIndex < this.state.imagesInCell.length - 1) {
        this.setState({ photoIndex: this.state.photoIndex + 1 });
        this.updateTagsInState();
      }
    } else if (e.key === "ArrowLeft") {
      if (this.state.photoIndex != 0) {
        this.setState({ photoIndex: this.state.photoIndex - 1 });
        this.updateTagsInState();
      }
    } else if (e.key === "Escape") {
      this.props.onBrowsingModeChanged(BrowsingModes.Cube);
    }
  }
}
