import React from 'react'
import * as R from 'ramda'
import coefStandarts from '~components/coefStandarts'
import ResultItem from './ResultItem.jsx'

const Calculating = ({ data }) => {
	// Эффективное число электроприемников
	const effectElectroCount = () => {
		// Получаем массив количества электроприемников приобразованных в числовые значения
		const getCounters = obj => +obj.count
		const counters = R.map(getCounters, data)

		// Получаем массив с квадратом значений Pном
		const pHomToPow = obj => Math.pow(+obj.pHom, 2)
		const pHom = R.map(pHomToPow, data)

		// Получаем массив суммы произведений квадрата Pном и количества электроприемников
		const pHomCountMultiple = (el, i) => el * counters[i]
		const mapIndexed = R.addIndex(R.map)
		const multiplePHomWithCounters = R.pipe(
			mapIndexed,
			R.sum
		)((el, i) => pHomCountMultiple(el, i), pHom)

		// Получаем сумму Pсум, кВт
		const psumObjFormatter = obj => +R.prop('pSumm', obj)
		const pSumResult = R.pipe(
			R.map,
			R.sum,
			R.flip(Math.pow)(2)
		)(psumObjFormatter, data)

		// Получаем эффективное число электроприемников
		return +(pSumResult / multiplePHomWithCounters).toFixed(0)
	}

	// Средневзвешенный коэффицент использования
	const usingCoef = () => {
		// Получаем массив коэффициентов использования kи каждого электроприемника
		const getCoefUsing = obj => +obj.kI
		const coefUsing = R.map(getCoefUsing, data)

		// Получаем массив номинальной мощности Pном каждого электроприемника
		const getPhom = obj => +obj.pHom
		const phom = R.map(getPhom, data)

		// Получаем массив суммы произведений Pном и коэффициентов использования kи
		const multiplyPHomWithKi = R.pipe(
			R.zipWith,
			R.sum
		)(R.multiply, coefUsing, phom)
		// Получаем сумму Pном
		const phomSum = R.sum(phom)

		//Получем средневзевешенный коэфф. использования Kи
		const multiplyPHomWithKi_divide_phomSum = multiplyPHomWithKi / phomSum

		if (multiplyPHomWithKi_divide_phomSum >= 0.1 && multiplyPHomWithKi_divide_phomSum <= 0.2) {
			return +(multiplyPHomWithKi_divide_phomSum / 5).toFixed(2) * 5
		}

		return multiplyPHomWithKi_divide_phomSum.toFixed(1)
	}

	// console.log('effectElectroCount', effectElectroCount(), 'ussingCoef()', ussingCoef())

	// Коэффициент расченой нагрузки из таблицы
	const coefPower = R.find(R.propEq('count', effectElectroCount()))(coefStandarts)[usingCoef()]

	// Активная мощность
	const activePower = () => {
		// Получаем массив коэффициентов использования kи каждого электроприемника
		const getCoefUsing = obj => +obj.kI
		const usingCoef = R.map(getCoefUsing, data)

		// Получаем массив Pсум
		const getPsum = obj => +obj.pSumm
		const pSum = R.map(getPsum, data)

		//Получаем массив суммы произведений kи и Pсум
		const pSumkIMultiply = R.pipe(
			R.zipWith,
			R.sum
		)(R.multiply, usingCoef, pSum)

		//Получаем активную мощность Pр
		return +(pSumkIMultiply * coefPower).toFixed(2)
	}

	//Реактивная мощность
	const reactivePower = () => {
		// Получаем массив коэффициентов использования kи каждого электроприемника
		const getCoefUsing = obj => +obj.kI
		const coefUsing = R.map(getCoefUsing, data)

		// Получаем массив Pсум
		const getPsum = obj => +obj.pSumm
		const pSum = R.map(getPsum, data)

		// Получаем массив коэффициентов реактивной мощности tgф каждого электроприемника
		const getCoefReactPow = obj => +obj.tg
		const ReactPowCoef = R.map(getCoefReactPow, data)

		//Получаем массив произведений kи и Pсум
		const kIPsumMultiply = R.zipWith(R.multiply, coefUsing, pSum)

		//Получаем массив суммы произведений kи, Pсум и tg ф
		const multiplyKIpSumTg = R.pipe(
			R.zipWith,
			R.sum
		)(R.multiply, kIPsumMultiply, ReactPowCoef)

		//	Получаем реактивную мощность Qр
		if (effectElectroCount > 10) {
			return +(1.1 * multiplyKIpSumTg).toFixed(2)
		} else {
			return +multiplyKIpSumTg.toFixed(2)
		}
	}

	//Полная мощность
	const fullPower = () => {
		const fullPow = Math.sqrt(Math.pow(activePower(), 2) + Math.pow(reactivePower(), 2))

		return +fullPow.toFixed(2)
	}

	//Расчетный ток
	const current = () => {
		const voltage = +data[0].uHom
		const sqrt = Math.sqrt(3)
		const sqrtVoltageMultiply = R.multiply(sqrt, voltage)

		return R.divide(fullPower(), sqrtVoltageMultiply).toFixed(2)
	}

	return (
		<div className="b-formulas">
			<ResultItem title="Эффективное число электроприемников" count={effectElectroCount()} unit="шт" img="effect_count_electro" />
			<ResultItem title="Активная мощность" count={activePower()} unit="кВт" img="result_active_power" />
			<ResultItem title="Реактивная мощность" count={reactivePower()} unit="кВАр" img="result_reactive_power_nl10" />
			<ResultItem title="Полная мощность" count={fullPower()} unit="кВА" img="result_full_power" />
			<ResultItem title="Расчетный ток" count={current()} unit="А" img="result_electro_power" />
		</div>
	)
}

export default Calculating
