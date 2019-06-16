import React from 'react'
import * as R from 'ramda'

const EffectElectroCount = ({ data }) => {
	// Получаем массив количества электроприемников приобразованных в числовые значения
	const getCounters = obj => +obj.count
	const counters = R.map(getCounters, data)

	// Получаем массив с квадратом значений Pном, 100% ПВ
	const pHomPVPToPow = obj => Math.pow(+obj.pHom_pv, 2)
	const pHomPV = R.map(pHomPVPToPow, data)

	// Получаем массив произведений квадрата Pном, 100% ПВ и количества электроприемников
	const pHomPVCountMultiple = (el, i) => el * counters[i]
	const mapIndexed = R.addIndex(R.map)
	const multiplePHomPVWithCounters = R.pipe(
		mapIndexed,
		R.sum
	)((el, i) => pHomPVCountMultiple(el, i), pHomPV)

	// Получаем сумму Pсум, кВт
	const psumObjFormatter = obj => +R.prop('pSumm', obj)
	const pSumResult = R.pipe(
		R.map,
		R.sum,
		R.flip(Math.pow)(2)
	)(psumObjFormatter, data)

	// Получаем эффективное число электроприемников
	const effectElectroCount = (pSumResult / multiplePHomPVWithCounters).toFixed(2)

	return (
		<div className="b-formulas__item">
			<div className="b-formulas__item-top">
				<h2>Эффективное число электроприемников</h2>
				<div className="b-formulas__item-count">
					<div className="b-formulas__item-number">{effectElectroCount}</div>
					<div className="b-formulas__item-unit">шт</div>
				</div>
			</div>
			<div className="b-formulas__item-bottom">
				<div className="b-formulas__item-formula">
					<img src="./src/img/formules/effect_count_electro.jpg" alt="эффективное число электроприемников" />
				</div>
				<div className="b-formulas__item-params" />
			</div>
		</div>
	)
}

export default EffectElectroCount
