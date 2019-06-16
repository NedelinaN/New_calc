import * as R from 'ramda'
import coefPart_1_20 from './coefPart_1_20'
import coefPart_21_40 from './coefPart_21_40'
import coefPart_41_60 from './coefPart_41_60'
import coefPart_61_80 from './coefPart_61_80'
import coefPart_81_100 from './coefPart_81_100'

const ElectricReceiverArr = [...coefPart_1_20, ...coefPart_21_40, ...coefPart_41_60, ...coefPart_61_80, ...coefPart_81_100]

const createObj = (el, i) => ({
	count: i + 1,
	'0.1': el[0],
	'0.15': el[1],
	'0.2': el[2],
	'0.3': el[3],
	'0.4': el[4],
	'0.5': el[5],
	'0.6': el[6],
	'0.7': el[7],
	'0.8': el[8],
})

const mapIndexed = R.addIndex(R.map)
const outputObj = mapIndexed((el, i) => createObj(el, i), ElectricReceiverArr)

export default outputObj
