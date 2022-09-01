import React, { Component } from "react";
import Searchbar from "../Searchbar/Searchbar";
import Button from "../Button/Button";
import { Audio } from 'react-loader-spinner';
import scroll from '../Scroll/Scroll';
import Modal from "../Modal/Modal";
import ImageGallery from "../ImageGallery/ImageGallery";
// import ImageGalleryItem from "../ImageGallery/ImageGalleryItem";

const API_KEY = '28203095-60f45d0309e92efa731dcf20a';
const axios = require('axios').default;
axios.defaults.baseURL = "https://pixabay.com/api/"
// let pageNr = 1;
// let searchValue = '';

class ImageFinder extends Component {
    state = {
        images: [],
        isButtonVisible: "hidden",
        isSpinnerLoading: true,
        isModalVisible: "hidden",
        imageLargeURL: "",
        alt: "",
        error: null,
        pageNr: 1,
        searchValue: '',
    }
    componentDidMount() {
        this.setState({ isSpinnerLoading: false });
    };
    resetSearch= ()=> {
        // this.state.pageNr = 1;
            this.setState(
            { images:[], pageNr:1 });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.resetSearch();
        const form = event.currentTarget;
        // this.state.searchValue = form.elements.search.value;
        this.setState({
            searchValue: form.elements.search.value });
        console.log(form.elements.search.value)
        console.log(this.state.searchValue, this.state.pageNr);
        this.fetchImages(this.state.searchValue, this.state.pageNr);
        form.reset();
    }

    async fetchImages(searchValue, pageNr) {
        this.setState({ isSpinnerLoading: true });
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
        try {
            const response = await axios.get(`?${searchParams}`);
            if (response.data.total > 0) {
                this.setState({
                    isButtonVisible: "visible",
                    images: [...this.state.images, ...response.data.hits],
                    pageNr: this.state.pageNr+1,
                }) 
            }
            else {
                this.setState({ isButtonVisible: "hidden" });
                alert("please insert proper search request")
            }
        } catch (error) {
            this.setState({ error });
            console.log(error)
        }
        finally {
            this.setState({
                isSpinnerLoading: false
            });
            scroll();
        }   
    }

    loadMore = (event) => {
        event.preventDefault();
        this.fetchImages(this.state.searchValue, this.state.pageNr);     
    }
    
    openModal = (event) => {
        event.preventDefault();
        this.setState({
            isModalVisible: "visible",
            imageLargeURL: event.currentTarget.href,
            alt: event.target.alt,
        });
    }    
    closeModal = (event) => {
        event.stopPropagation();
        if (event.target.nodeName==="IMG") {
            return
        }
            this.setState({
            isModalVisible: "hidden",
            imageLargeURL: "",    
            });
    }
    closeModalByEsc = (event) => {
        if (event.keyCode === 27) {
            this.setState({
            isModalVisible: "hidden", 
            });
        }
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
        const { images, isButtonVisible, isSpinnerLoading, isModalVisible, pageNr } = this.state;
        if (isModalVisible === "visible") {
            document.addEventListener('keydown', this.closeModalByEsc)
        } 
        return (
            <div>
                <Searchbar onSubmit={this.handleSubmit} />
                <ImageGallery children={this.renderImages(images)} ></ImageGallery>
                <Button loadMore={this.loadMore} isButtonVisible={isButtonVisible} pageNr={pageNr} />
                <Audio className="Audio" visible={isSpinnerLoading} />
                <Modal isModalVisible={isModalVisible} imageLargeURL={this.state.imageLargeURL}
                        alt={this.state.alt} closeModal={this.closeModal}/>
            </div>
        )
    }
}

export default ImageFinder;
