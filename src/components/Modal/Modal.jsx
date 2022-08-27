import React, { Component } from "react";

class Modal extends Component {

    render() {

        return (
            <div tabIndex={0} className="Overlay" style={{ visibility: this.props.isModalVisible }} onClick={this.props.closeModal} onKeyDown={this.props.closeModal} >
                <div className="Modal">
                    <img src={this.props.imageLargeURL} alt={this.props.alt} />
                </div>
            </div>
        )
    }
}

export default Modal;