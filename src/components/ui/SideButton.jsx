import React from 'react'

const SideButton = ({ link, text, icon, anchorId }) =>
	link ? (
		<a href={`#${anchorId}`} className="b-side-btn">
			<span className="b-side-btn__inner">
				<img src={`./src/img/${icon}.svg`} alt="Иконка действия" />
				<span>{text}</span>
			</span>
		</a>
	) : (
		<button className="b-side-btn">
			<span className="b-side-btn__inner">
				<img src={`./src/img/${icon}.svg`} alt="Иконка действия" />
				<span>{text}</span>
			</span>
		</button>
	)

export default SideButton
