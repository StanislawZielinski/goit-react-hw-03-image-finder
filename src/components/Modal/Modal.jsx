import React, { Component } from "react";
import PropTypes from "prop-types";

class Modal extends Component {
    render() {
        return (
            <div tabIndex={0} className="Overlay" style={{ visibility: this.props.isModalVisible }} onClick={this.props.closeModal}>
                <div className="Modal"  >
                    <img src={this.props.imageLargeURL} alt={this.props.alt} />
                </div>
            </div>
        )
    }
}

export default Modal;
Modal.propTypes = {
    isModalVisible: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    imageLargeURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
}