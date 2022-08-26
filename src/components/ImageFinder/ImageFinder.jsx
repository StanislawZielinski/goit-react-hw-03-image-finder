import React, { Component } from "react";
import Searchbar from "../Searchbar/Searchbar";
import Button from "../Button/Button";
// import ImageGallery from "../ImageGallery/ImageGallery";
// import ImageGalleryItem from "../ImageGallery/ImageGalleryItem";
// import Loader from "../Loader/Loader";
// import Modal from "../Modal/Modal";
// import PropTypes from 'prop-types';
const API_KEY = '28203095-60f45d0309e92efa731dcf20a';
// import axios from "axios";

const axios = require('axios').default;
axios.defaults.baseURL = "https://pixabay.com/api/"
let pageNr = 1;
let searchValue = '';
class ImageFinder extends Component {
    static defaultProps = {
    search: [],
  };
    state = {
        images: [],
        isButtonVisible: "hidden",
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        searchValue = form.elements.search.value;
        form.reset();
        pageNr = 1;
        this.setState({images:[]})
        this.fetchImages(searchValue, pageNr);
        return searchValue;
    }

    async fetchImages (searchValue, pageNr) {
        const searchParams = new URLSearchParams(
            {
                key: API_KEY,
                q: searchValue,
                per_page: 3,
                page: pageNr,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: "true",
            }
         );  
        const response = await axios.get(`?${searchParams}`);
        this.setState({
            images: [...this.state.images, ...response.data.hits],
            isButtonVisible: true,
        })
    }

    loadMore = () => {
        pageNr += 1;
        this.fetchImages(searchValue, pageNr);
    }
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
        const { images } = this.state;
        return (
            <div>
                <Searchbar onSubmit={this.handleSubmit} />          
                <ul className="ImageGallery">{this.renderImages(images)}</ul>
                <Button loadMore={this.loadMore} isButtonVisible={this.state.isButtonVisible} />
            </div>
        )
    }
}

export default ImageFinder;