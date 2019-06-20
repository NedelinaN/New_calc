import React from 'react'

const SideButton = ({ link, text, icon, anchorId, inverse }) =>
	link ? (
		<a href={`#${anchorId}`} className={`b-side-btn ${inverse && 'inverse'}`}>
			<span className="b-side-btn__inner">
				{inverse ? (
					<>
						<span>{text}</span>
						<img src={`./src/img/${icon}.svg`} alt="Иконка действия" />
					</>
				) : (
					<>
						<img src={`./src/img/${icon}.svg`} alt="Иконка действия" />
						<span>{text}</span>
					</>
				)}
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
