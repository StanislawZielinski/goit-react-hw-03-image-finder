import React, { Component } from "react";

class ImageGalleryItem extends Component {

    renderImages = (images) => {
        return images.map(
            image =>
                <li className="ImageGalleryItem" key={image.id} >
                    <a href={image.largeImageURL}>
                        <img src={image.webformatURL} alt="" className="ImageGalleryItem-image"/>
                    </a>
                </li>)     
    }
    
    render() {
        // const { images } = this.state;
        return (this.renderImages(this.props.images))
        //     ({ images }) =>  (
        //         <ul className="ImageGallery">
        //             {images.map(({ this.props.id, this.props.webformatURL, this.props.largeImageURL }) => return (
        //             <li className="gallery-item" key={this.props.id} >
        //                 <a href={this.props.largeImageURL}>
        //                     <img src={this.props.webformatURL} alt="" />
        //                 </a>
        //             </li>)
                    
        //             )}
        //         </ul>
        // ) 

    }
}

export default ImageGalleryItem;