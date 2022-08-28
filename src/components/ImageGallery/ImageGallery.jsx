import React, { Component } from "react";
import PropTypes from "prop-types";
// import ImageGalleryItem from "./ImageGalleryItem";
class ImageGallery extends Component {

    render() {
        return (
            <ul className="ImageGallery">
                {this.props.children}
            </ul>
        )
    }
}

export default ImageGallery;
ImageGallery.propTypes = {
    children: PropTypes.func.isRequired,
}