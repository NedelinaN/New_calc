/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import React from 'react'
import * as R from 'ramda'
import coefStandarts from '~components/coefStandarts'
import ResultItem from './ResultItem.jsx'

const Calculating = ({ data, outputCalculating, setOutputCalculating }) => {
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
		}

		return +multiplyKIpSumTg.toFixed(2)
	}

	//Полная мощность
	const fullPower = () => +Math.sqrt(Math.pow(activePower(), 2) + Math.pow(reactivePower(), 2)).toFixed(2)

	//Расчетный ток
	const current = () => {
		const voltage = +data[0].uHom
		const sqrt = Math.sqrt(3)
		const sqrtVoltageMultiply = R.multiply(sqrt, voltage)

		return R.divide(fullPower(), sqrtVoltageMultiply).toFixed(2)
	}

	//Kи*Pсум
	const kipsum = () => {
		// Получаем массив коэффициентов использования kи каждого электроприемника
		const getCoefUsing = obj => +obj.kI
		const usingCoef = R.map(getCoefUsing, data)

		// Получаем массив номинальной мощности Pном каждого электроприемника
		const getPsum = obj => +obj.pSumm
		const psum = R.map(getPsum, data)
		const pSumKiMultiply = R.zipWith(R.multiply, usingCoef, psum)
		const fixed = x => x.toFixed(2)

		return R.map(fixed, pSumKiMultiply)
	}
	// console.log('kipsum', kipsum())

	// n*Pсум
	const npsum = () => {
		// Получаем массив количества электроприемников приобразованных в числовые значения
		const getCounters = obj => +obj.count
		const counters = R.map(getCounters, data)

		// Получаем массив Pсум
		const getPsum = obj => +obj.pSumm
		const pSum = R.map(getPsum, data)
		const pSumNMultiply = R.zipWith(R.multiply, counters, pSum)
		const fixed = x => x.toFixed(2)

		return R.map(fixed, pSumNMultiply)
	}
	// console.log('npsum', npsum())

	//Pном*Pном
	const pnomsq = () => {
		// Получаем массив номинальной мощности Pном каждого электроприемника
		const getPhom = obj => +obj.pHom
		const phom = R.map(getPhom, data)
		const double = x => x * 2
		const phomPow = R.map(double, phom)
		const fixed = x => x.toFixed(2)

		return R.map(fixed, phomPow)
	}
	// console.log('pnomsq', pnomsq())

	//Рн*cosф
	const pnomcos = () => {
		// Получаем массив номинальной мощности Pном каждого электроприемника
		const getPhom = obj => +obj.pHom
		const phom = R.map(getPhom, data)

		const getCos = obj => +obj.cos
		const cos = R.map(getCos, data)
		const pHomCosMultiply = R.zipWith(R.multiply, phom, cos)
		const fixed = x => x.toFixed(2)

		return R.map(fixed, pHomCosMultiply)
	}
	// console.log('pnomcos', pnomcos())

	//n*Pн2
	const nphom = () => {
		// Получаем массив количества электроприемников приобразованных в числовые значения
		const getCounters = obj => +obj.count
		const counters = R.map(getCounters, data)

		// Получаем массив номинальной мощности Pном каждого электроприемника
		const getPhom = obj => +obj.pHom
		const phom = R.map(getPhom, data)

		const double = x => x * 2
		const phomPow = R.map(double, phom)
		const nPhomMultiply = R.zipWith(R.multiply, counters, phomPow)
		const fixed = x => x.toFixed(2)

		return R.map(fixed, nPhomMultiply)
	}
	// console.log('nphom', nphom())

	//Ки*Рн
	const kiphom = () => {
		// Получаем массив номинальной мощности Pном каждого электроприемника
		const getPhom = obj => +obj.pHom
		const phom = R.map(getPhom, data)

		// Получаем массив коэффициентов использования kи каждого электроприемника
		const getCoefUsing = obj => +obj.kI
		const usingCoef = R.map(getCoefUsing, data)
		const kIpHomMultiply = R.zipWith(R.multiply, usingCoef, phom)
		const fixed = x => x.toFixed(2)

		return R.map(fixed, kIpHomMultiply)
	}
	// console.log('kiphom', kiphom())

	//Ки*Рн*tgф
	const kiphomtg = () => {
		// Получаем массив номинальной мощности Pном каждого электроприемника
		const getPhom = obj => +obj.pHom
		const phom = R.map(getPhom, data)

		// Получаем массив коэффициентов использования kи каждого электроприемника
		const getCoefUsing = obj => +obj.kI
		const usingCoef = R.map(getCoefUsing, data)

		// Получаем массив коэффициентов реактивной мощности tgф каждого электроприемника
		const getCoefReactPow = obj => +obj.tg
		const ReactPowCoef = R.map(getCoefReactPow, data)

		//Получаем массив произведений kи и Pсум
		const kIPhomMultiply = R.zipWith(R.multiply, usingCoef, phom)
		const kIPhomTgMultiply = R.zipWith(R.multiply, kIPhomMultiply, ReactPowCoef)
		const fixed = x => x.toFixed(2)

		return R.map(fixed, kIPhomTgMultiply)
	}
	// console.log('kiphomtg', kiphomtg())

	//Ки*Рсум*tgф
	const kipsumtg = () => {
		// Получаем массив коэффициентов использования kи каждого электроприемника
		const getCoefUsing = obj => +obj.kI
		const usingCoef = R.map(getCoefUsing, data)

		// Получаем массив коэффициентов реактивной мощности tgф каждого электроприемника
		const getCoefReactPow = obj => +obj.tg
		const ReactPowCoef = R.map(getCoefReactPow, data)

		// Получаем массив Pсум
		const getPsum = obj => +obj.pSumm
		const pSum = R.map(getPsum, data)

		const kIPsumMultiply = R.zipWith(R.multiply, usingCoef, pSum)
		const kIPsumTgMultiply = R.zipWith(R.multiply, kIPsumMultiply, ReactPowCoef)
		const fixed = x => x.toFixed(2)

		return R.map(fixed, kIPsumTgMultiply)
	}
	// console.log('kipsumtg', kipsumtg())

	//Ки*Рн*cosф
	const kiphomcos = () => {
		// Получаем массив коэффициентов использования kи каждого электроприемника
		const getCoefUsing = obj => +obj.kI
		const usingCoef = R.map(getCoefUsing, data)

		// Получаем массив коэффициентов реактивной мощности cosф каждого электроприемника
		const getCoefReactPow = obj => +obj.cos
		const ActPowCoef = R.map(getCoefReactPow, data)

		// Получаем массив номинальной мощности Pном каждого электроприемника
		const getPhom = obj => +obj.pHom
		const phom = R.map(getPhom, data)

		const kIPhomMultiply = R.zipWith(R.multiply, usingCoef, phom)
		const kIPhomCosMultiply = R.zipWith(R.multiply, kIPhomMultiply, ActPowCoef)
		const fixed = x => x.toFixed(2)

		return R.map(fixed, kIPhomCosMultiply)
	}
	// console.log('kiphomcos', kiphomcos())

	//Ки*n*cosф
	const nkicos = () => {
		// Получаем массив коэффициентов использования kи каждого электроприемника
		const getCoefUsing = obj => +obj.kI
		const usingCoef = R.map(getCoefUsing, data)

		// Получаем массив коэффициентов реактивной мощности cosф каждого электроприемника
		const getCoefReactPow = obj => +obj.cos
		const ActPowCoef = R.map(getCoefReactPow, data)

		// Получаем массив количества электроприемников приобразованных в числовые значения
		const getCounters = obj => +obj.count
		const counters = R.map(getCounters, data)

		const kInMultiply = R.zipWith(R.multiply, usingCoef, counters)
		const kInCosMultiply = R.zipWith(R.multiply, kInMultiply, ActPowCoef)
		const fixed = x => x.toFixed(2)

		return R.map(fixed, kInCosMultiply)
	}
	// console.log('nkicos', nkicos())

	// Промежуточные результаты
	const outputKipsum = kipsum()
	const outputNpsum = npsum()
	const outputPnomsq = pnomsq()
	const outputPnomcos = pnomcos()
	const outputNphom = nphom()
	const outputKiphom = kiphom()
	const outputKiphomtg = kiphomtg()
	const outputKipsumtg = kipsumtg()
	const outputKiphomcos = kiphomcos()
	const outputNkicos = nkicos()
	let outputMiddleArr = []

	for (let i = 0; i <= R.length(data); i++) {
		outputMiddleArr.push([
			outputKipsum[i],
			outputNpsum[i],
			outputPnomsq[i],
			outputPnomcos[i],
			outputNphom[i],
			outputKiphom[i],
			outputKiphomtg[i],
			outputKipsumtg[i],
			outputKiphomcos[i],
			outputNkicos[i],
		])
	}


	// Финальные результаты
	const outputEffectElectroCount = effectElectroCount()
	const outputActivePower = (activePower() / 1000).toFixed(2)
	const outputReactivePower = (reactivePower() / 1000).toFixed(2)
	const outputFullPower = (fullPower() / 1000).toFixed(2)
	const outputCurrent = current()

	if (!outputCalculating)
		setOutputCalculating({
			outputResults: [outputEffectElectroCount, outputActivePower, outputReactivePower, outputFullPower, outputCurrent],
			middleResults: outputMiddleArr,
		})
	const paramsEffectElectroCount = ['Pn – суммарная номинальная мощность, кВт', 'n – количество электроприемников, шт', 'pn – номинальная мощность, кВт']
	const paramsActivePower = ['Kр – коэффициент расчетной мощности', 'Kи – коэффициент использования', 'Pn – суммарная номинальная мощность, кВт']
	const paramsReactivePower = ['Kи – коэффициент использования', 'Pn – суммарная номинальная мощность, кВт', 'tgφ – коэффициент реактивной нагрузки']
	const paramsFullPower = ['Pр – активная мощность, кВт', 'Qр – реактивная мощность, кВАр']
	const paramsCurrent = ['Sр – полная мощность, кВА', 'U – номинальное напряжение, кВ']

	return (
		<div className="b-formulas">
			<ResultItem
				params={paramsEffectElectroCount}
				title="Эффективное число электроприемников"
				count={outputEffectElectroCount}
				unit="шт"
				img="effect_count_electro"
			/>
			<ResultItem params={paramsActivePower} title="Активная мощность" count={outputActivePower} unit="кВт" img="result_active_power" />
			<ResultItem
				params={paramsReactivePower}
				title="Реактивная мощность"
				count={outputReactivePower}
				unit="кВАр"
				img={outputEffectElectroCount <= 10 ? 'result_reactive_power_nl10' : 'result_reactive_power_nm10'}
			/>
			<ResultItem params={paramsFullPower} title="Полная мощность" count={outputFullPower} unit="кВА" img="result_full_power" />
			<ResultItem params={paramsCurrent} title="Расчетный ток" count={outputCurrent} unit="А" img="result_electro_power" />
		</div>
	)
}

export default Calculating
