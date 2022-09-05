import React, { Component } from "react";
import Searchbar from "../Searchbar/Searchbar";
import Button from "../Button/Button";
import { Audio } from 'react-loader-spinner';
import scroll from '../Scroll/Scroll';
import Modal from "../Modal/Modal";
import ImageGallery from "../ImageGallery/ImageGallery";
import fetch from "services/api";


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
        this.setState(() => {return {images: [], pageNr: 1} })
    }
    handleChange = (event) => {
        this.setState({
            searchValue: event.currentTarget.value
        }); 
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.resetSearch();
        this.fetchImages(this.state.searchValue, 1);
        const form = event.currentTarget;
        form.reset();
    }

    async fetchImages(searchValue, pageNr) {
        this.setState({ isSpinnerLoading: true });
        try {
            const response = await fetch(searchValue, pageNr);
            if (response.length > 0) {
                this.setState({
                    isButtonVisible: "visible",
                    images: [...this.state.images, ...response],
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
        const { images, isButtonVisible, isSpinnerLoading, isModalVisible } = this.state;
        if (isModalVisible === "visible") {
            document.addEventListener('keydown', this.closeModalByEsc)
        } 
        return (
            <div>
                <Searchbar onSubmit={this.handleSubmit} onChange={this.handleChange} />
                <ImageGallery children={this.renderImages(images)} ></ImageGallery>
                <Button loadMore={this.loadMore} isButtonVisible={isButtonVisible} />
                <Audio className="Audio" visible={isSpinnerLoading} />
                <Modal isModalVisible={isModalVisible} imageLargeURL={this.state.imageLargeURL}
                        alt={this.state.alt} closeModal={this.closeModal}/>
            </div>
        )
    }
}

export default ImageFinder;
