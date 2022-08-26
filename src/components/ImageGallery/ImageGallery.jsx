import React, { Component } from "react";
import ImageGalleryItem from "./ImageGalleryItem";
class ImageGallery extends Component {

    render() {
        return (
            <ul className="ImageGallery">
                <ImageGalleryItem />
            </ul>
        )
    }
}

export default ImageGallery;