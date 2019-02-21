import React, { Component } from 'react';

import './Button.css';

class Button extends Component {
	render() {
		const { swipe, boxStyle, textStyle, shapeStyle, text } = this.props;
		return (
			<div className="nextBox" style={boxStyle}>
				<button
					onClick={() => swipe()}
					className="nextText"
					style={textStyle}
				>
					{text || 'next'}
				</button>
				<div className="nextShape" style={shapeStyle} />
			</div>
		);
	}
}

export default Button;
