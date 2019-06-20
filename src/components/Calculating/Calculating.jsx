import React from 'react'
import * as R from 'ramda'
import ResultItem from './ResultItem.jsx'

const Calculating = ({ data }) => {
	console.log('render calculator')
	// Эффективное число электроприемников
	const effectElectroCount = () => {
		// Получаем массив количества электроприемников приобразованных в числовые значения
		const getCounters = obj => +obj.count
		const counters = R.map(getCounters, data)

		// Получаем массив с квадратом значений Pном, 100% ПВ
		const pHomPVPToPow = obj => Math.pow(+obj.pHom_pv, 2)
		const pHomPV = R.map(pHomPVPToPow, data)

		// Получаем массив суммы произведений квадрата Pном, 100% ПВ и количества электроприемников
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

	// Средне-взвешенный коэффицент использования
	const ussingCoef = () => {
		// Получаем массив коэффициентов использования kи каждого электроприемника
		const getCoefUsing = obj => +obj.kI
		const coefUsing = R.map(getCoefUsing, data)

		// Получаем массив номинальной мощности Pном, 100% ПВ каждого электроприемника
		const getPhom = obj => +obj.pHom_pv
		const phom = R.map(getPhom, data)

		// Получаем массив суммы произведений Pном, 100% ПВ и коэффициентов использования kи
		const pHomkIMultiply = (x, y) => x * y
		const multiplyPHomWithKi = R.pipe(
			R.zipWith,
			R.sum
		)(pHomkIMultiply, coefUsing, phom)
		// Получаем сумму Pном, 100% ПВ
		const phomSum = R.sum(phom)

		//Получем средневзевешенный коэфф. использования Kи
		const multiplyPHomWithKi_divide_phomSum = multiplyPHomWithKi / phomSum

		if (multiplyPHomWithKi_divide_phomSum >= 0.1 && multiplyPHomWithKi_divide_phomSum <= 0.2) {
			return +(multiplyPHomWithKi_divide_phomSum / 5).toFixed(2) * 5
		}

		return multiplyPHomWithKi_divide_phomSum.toFixed(1)
	}

	console.log('ussingCoef()', ussingCoef())

	// const coefPower = коэффициент расчетной нагрузки по таблице

	/* const activePower = (K) => {

		// Получаем массив коэффициентов использования kи каждого электроприемника
		const getCoefUsing = obj => +obj.kI
		const usingCoef = R.map(getCoefUsing, data)

		// Получаем массив Pсум
		const getPsum = obj => +obj.pSumm
		const pSum = R.map(getCoefReactPow, data)

		//Получаем массив суммы произведений kи и Pсум
		const pSumkIMultiply = R.pipe(
			R.zipWith,
			R.sum
		)
		(R.multiply, usingCoef, pSum) 

		//Получаем активную мощность Pр
		return (pSumkIMultiply / K )
	}*/

	const reactivePower = () => {
		// Получаем массив коэффициентов использования kи каждого электроприемника
		const getCoefUsing = obj => +obj.kI
		const coefUsing = R.map(getCoefUsing, data)

		// Получаем массив Pсум
		const getPsum = obj => +obj.pSumm
		const pSum = R.map(getCoefReactPow, data)

		// Получаем массив коэффициентов реактивной мощности tgф каждого электроприемника
		const getCoefReactPow = obj => +obj.tg
		const ReactPowCoef = R.map(getCoefReactPow, data)

		//Получаем массив произведений kи и Pсум
		const kIPsumMultiply = R.zipWith(R.multiply, coefUsing, pSum)

		//Получаем массив суммы произведений kи, Pсум и tg ф
		const kIPsumTgMultiply = R.pipe(
			R.zipWith,
			R.sum
		)(R.multiply, kIPsumMultiply, ReactPowCoef)

		//	Получаем реактивную мощность Qр
		return 1.1 * kIPsumTgMultiply
	}

	const fullPower = () => {}

	return (
		<div className="b-formulas">
			<ResultItem title="Эффективное число электроприемников" count={effectElectroCount()} unit="шт" img="effect_count_electro" />
			{/* <ResultItem title="Активная мощность" count={activePower()} unit="кВт" img="result_active_power" /> */}
		</div>
	)
}

export default Calculating
