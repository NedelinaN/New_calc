import React from 'react'

const SideButton = ({ text, icon }) => (
	<button className="side-btn">
		<span>{text}</span>
		<img src={`./src/img/${icon}.svg`} alt="Иконка действия" />
	</button>
)

export default SideButton
