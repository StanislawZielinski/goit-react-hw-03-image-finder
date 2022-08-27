import React, { Component } from "react";
// import * as basicLightbox from 'basiclightbox';
import Searchbar from "../Searchbar/Searchbar";
import Button from "../Button/Button";
import { Audio } from 'react-loader-spinner';
import scroll from '../Scroll/Scroll';
import Modal from "../Modal/Modal";
// import ImageGallery from "../ImageGallery/ImageGallery";
// import ImageGalleryItem from "../ImageGallery/ImageGalleryItem";
// import Loader from "../Loader/Loader";

// import PropTypes from 'prop-types';
const API_KEY = '28203095-60f45d0309e92efa731dcf20a';


const axios = require('axios').default;
axios.defaults.baseURL = "https://pixabay.com/api/"
let pageNr = 1;
let searchValue = '';
// let imageLargeURL = '';
class ImageFinder extends Component {

    state = {
        images: [],
        isButtonVisible: "hidden",
        isSpinnerLoading: true,
        isModalVisible: "hidden",
        imageLargeURL: "",
        alt:"",
    }
    componentDidMount() {
        this.setState ({isSpinnerLoading:false})
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

    async fetchImages(searchValue, pageNr) {
        this.setState ({isSpinnerLoading:true})
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
        console.log(response);

        if (response.data.total > 0) {
           this.setState({ isButtonVisible: "visible" }) 
        }
        else {
            this.setState({ isButtonVisible: "hidden" });
            alert("please insert proper search request")
        }
        this.setState({
            images: [...this.state.images, ...response.data.hits],
            isSpinnerLoading: false,
        });
        scroll();
    }

    loadMore = () => {
        pageNr += 1;
        this.fetchImages(searchValue, pageNr);
        // scroll();
    }
    
    openModal = (event) => {
        event.preventDefault();
        console.log(event.target.alt);
        this.setState({
            isModalVisible: "visible",
            imageLargeURL: event.currentTarget.href,
            alt: event.target.alt,
        });
    }    
    closeModal = (event) => {
            this.setState({
            isModalVisible: "hidden",
            imageLargeURL: "",    
            });
        console.log("1234")
    }

    renderImages = (images) => {
        return images.map(
            image =>
                <li className="ImageGalleryItem" key={image.id} >
                    <a href={image.largeImageURL} onClick={this.openModal} >
                        <img src={image.webformatURL} alt={image.tags} className="ImageGalleryItem-image"/>
                    </a>
                </li>)     
    }
    render() {
        const { images, isButtonVisible, isSpinnerLoading, isModalVisible } = this.state;
        console.log(this.state.imageLargeURL)
        return (
            <div>
                <Searchbar onSubmit={this.handleSubmit} />          
                <ul className="ImageGallery">{this.renderImages(images)}</ul>
                <Button loadMore={this.loadMore} isButtonVisible={isButtonVisible} />
                <Audio className="Audio" visible={isSpinnerLoading} />
                <Modal isModalVisible={isModalVisible} imageLargeURL={this.state.imageLargeURL}
                        alt={this.state.alt} closeModal={this.closeModal} />
            </div>
        )
    }
}

export default ImageFinder;
