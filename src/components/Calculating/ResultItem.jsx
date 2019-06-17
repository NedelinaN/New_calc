import React from 'react'

const ResultItem = ({ title, count, unit, img }) => {
	return (
		<div className="b-formulas__item">
			<div className="b-formulas__item-top">
				<h2>{title}</h2>
				<div className="b-formulas__item-count">
					<div className="b-formulas__item-number">{count}</div>
					<div className="b-formulas__item-unit">{unit}</div>
				</div>
			</div>
			<div className="b-formulas__item-bottom">
				<div className="b-formulas__item-formula">
					<img src={`./src/img/formules/${img}.jpg`} alt={title} />
				</div>
				<div className="b-formulas__item-params" />
			</div>
		</div>
	)
}

export default ResultItem
