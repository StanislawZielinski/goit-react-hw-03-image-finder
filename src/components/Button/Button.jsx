import React, { Component } from "react";
import PropTypes from "prop-types";

class Button extends Component {

    render() {
        return (
            <button className="Button" onClick={this.props.loadMore}
                style={{ visibility: this.props.isButtonVisible }}>Load more</button>
        )
    }
}

export default Button;

Button.propTypes = {
    loadMore: PropTypes.func.isRequired,
    isButtonVisible: PropTypes.string.isRequired
}