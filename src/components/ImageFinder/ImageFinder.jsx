import React, { Component } from "react";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageGalleryItem from "../ImageGallery/ImageGalleryItem";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import PropTypes from 'prop-types';
const API_KEY = '28203095-60f45d0309e92efa731dcf20a';
// import axios from "axios";

const axios = require('axios').default;
axios.defaults.baseURL = "https://pixabay.com/api/"
let pageNr = 1;
let searchValue = '';
class ImageFinder extends Component {
    state = {
        images: []
    }

    // async componentDidMount() {
    //     const response = await axios.get(`?${this.searchParams}`);
    //     this.setState({ ...this.setState, images: response.data.hits });
    //     console.log("componentDidMount")
    // }
    
    handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        searchValue = form.elements.search.value;
        // form.reset();
        pageNr = 1;
        this.fetchImages(searchValue, pageNr);
        console.log(searchValue);
        return searchValue;
    }
    showSth(searchValue) {
        console.log(searchValue)
    }
    async fetchImages(searchValue, pageNr) {
        const searchParams = new URLSearchParams(
            {
                key: API_KEY,
                q: searchValue,
                per_page: 12,
                page: pageNr,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: "true",
            }
         );  
        const response = await axios.get(`?${searchParams}`);
        this.setState({ ...this.setState, images: response.data.hits });
        console.log(response);
    }

    loadMore = () => {
        pageNr += 1;
        console.log(pageNr);
        console.log(searchValue);
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
                <Button loadMore={this.loadMore}/>


            </div>
        )
    }
}

export default ImageFinder;