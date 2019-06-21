import React from 'react'

const SideButton = ({ link, text, icon, anchorId, inverse, onClick, style }) =>
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
		<button style={style} className={`b-side-btn ${inverse && 'inverse'}`} onClick={onClick}>
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
		</button>
	)

export default SideButton
