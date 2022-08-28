import React, { Component } from "react";

class Button extends Component {

    render() {
        return (
            <button className="Button" onClick={this.props.loadMore}
                style={{ visibility: this.props.isButtonVisible }}>Load more</button>
        )
    }
}

export default Button;