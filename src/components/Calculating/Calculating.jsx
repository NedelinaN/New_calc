import React from 'react'
import * as R from 'ramda'
import ResultItem from './ResultItem.jsx'

const Calculating = ({ data }) => {
	const effectElectroCount = () => {
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
		return (pSumResult / multiplePHomPVWithCounters).toFixed(0)
	}

	return (
		<div className="b-formulas">
			<ResultItem title="Эффективное число электроприемников" count={effectElectroCount()} unit="шт" img="effect_count_electro" />
			<ResultItem title="Активная мощность" count={effectElectroCount()} unit="кВт" img="result_active_power" />
		</div>
	)
}

export default Calculating
