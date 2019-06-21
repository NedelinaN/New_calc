import React from 'react'

const SideTitle = ({ text, inverse }) => (
	<h2 className={`b-side-title ${inverse && 'inverse'}`}>
		<span className="b-side-title__text">{text}</span>
	</h2>
)

export default SideTitle
