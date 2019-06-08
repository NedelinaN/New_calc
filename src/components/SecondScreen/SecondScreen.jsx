import React from 'react'

const SecondScreen = ({ firstScreenData }) => {
	const createLine = (el, i) => (
		<div key={i + 1}>
			<div>{i + 1}</div>
			<div>{el.name}</div>
			<div>{el.count}</div>
			<div>{el.uHom}</div>
			<div>{el.pHom}</div>
			<div>{el.pv}</div>
			<div>{el.pHom_pv}</div>
			<div>{el.pSumm}</div>
			<div>{el.kI}</div>
			<div>{el.cos}</div>
		</div>
	)

	return <div>{firstScreenData.map((el, i) => createLine(el, i))}</div>
}

export default SecondScreen
