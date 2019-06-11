import React from 'react'
import * as R from 'ramda'
import XLSX from 'xlsx'
import DragDropFile from './DragDropFile.jsx'
import { make_cols } from './helpers'
import H1 from '~ui/H1.jsx'
import Logo from '~ui/Logo.jsx'
// import OutTable from './components/OutTable.jsx'

// import { calcData } from './components/calcData'

const FirstScreen = ({ setDataFirstScreen }) => {
	function handleFile(file) {
		const reader = new FileReader()
		const rABS = !!reader.readAsBinaryString
		reader.onload = e => {
			/* Parse data */
			const bstr = e.target.result
			const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' })
			/* Get first worksheet */
			const wsname = wb.SheetNames[0]
			const ws = wb.Sheets[wsname]
			/* Convert array of arrays */
			const data = R.drop(1, XLSX.utils.sheet_to_json(ws, { header: 1 }))
			/* Update state */
			const formattedValue = el => ({
				name: el[1],
				count: el[2],
				uHom: el[3],
				pHom: el[4],
				pv: el[5],
				pHom_pv: el[6],
				pSumm: el[7],
				kI: el[8],
				cos: el[9],
				tg: '123',
			})
			const formattedData = R.map(formattedValue, data)
			setDataFirstScreen(formattedData)
		}
		if (rABS) reader.readAsBinaryString(file)
		else reader.readAsArrayBuffer(file)
	}

	return (
		<div className="b-container b-container--intro">
			<main className="b-main b-main--intro">
				<div className="b-intro">
					<div className="b-name">
						<Logo />
						<div className="b-description">Программное обеспечение для расчета нагрузки систем внутризаводского электроснабжения.</div>
					</div>
				</div>

				<div className="b-download">
					<img className="b-decor" src="./src/img/flash.svg" alt="Декор элемент" />
					<H1 text="Загрузка таблицы" />
					<div className="b-description">
						Расчет производится на основе РТМ 36.18.32.4-92 по форме Ф636-92.
						<br />
						Для выполнения расчетов, пожалуйста загрузите таблицу в следующих форматах: XLSX/XLSM, XML, XLS/XLW.
					</div>
					<DragDropFile text="загрузить" handleFile={handleFile} />
				</div>
			</main>
			<footer className="b-footer">
				<div className="b-footer__item">
					<div className="b-footer__item-label">Версия</div>
					<div className="b-footer__item-text">1.0.0</div>
				</div>

				<div className="b-footer__item">
					<div className="b-footer__item-label">Разработчик</div>
					<div className="b-footer__item-text">Неделина Анастасия</div>
				</div>
			</footer>
		</div>
	)
}

export default FirstScreen

// const [state, setState] = useState({
// 	data: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
// 	cols: [] /* Array of column objects e.g. { name: "C", K: 2 } */,
// })

// function handleFile(file) {
// 	const reader = new FileReader()
// 	const rABS = !!reader.readAsBinaryString
// 	reader.onload = e => {
// 		/* Parse data */
// 		const bstr = e.target.result
// 		const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' })
// 		/* Get first worksheet */
// 		const wsname = wb.SheetNames[0]
// 		const ws = wb.Sheets[wsname]
// 		/* Convert array of arrays */
// 		const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
// 		/* Update state */
// 		setState({ data: data, cols: make_cols(ws['!ref']) })
// 	}
// 	if (rABS) reader.readAsBinaryString(file)
// 	else reader.readAsArrayBuffer(file)
// }

// function exportFile() {
// 	/* convert state to workbook */
// 	const ws = XLSX.utils.aoa_to_sheet(state.data)
// 	const wb = XLSX.utils.book_new()
// 	XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
// 	/* generate XLSX file and send to client */
// 	XLSX.writeFile(wb, 'result.xlsx')
// }

// function buildChildItems(elParent) {
// 	const childItems = []

// 	elParent.forEach((elChild, index) => {
// 		childItems.push(
// 			<div className="b-calc__item-line" key={index}>
// 				<div className="b-calc__item-prop">{elChild.prop}</div>
// 				<div className="b-calc__item-value">{elChild.value}</div>
// 			</div>
// 		)
// 	})

// 	return childItems
// }

// function buildParentItems() {
// 	const parentItems = []

// 	calcData.forEach((elParent, index) => {
// 		parentItems.push(
// 			<div className="b-calc__item" key={index}>
// 				{buildChildItems(elParent)}
// 			</div>
// 		)
// 	})

// 	return parentItems
// }

// return (
// 	<>
// 		<div className="b-main">
// 			<div className="b-title">
// 				<h1 className="title">Автоматизированный расчёт нагрузки системы электроснабжения</h1>
// 				<div className="b-description">Здесь будет описание</div>
// 			</div>
// 			<DragDropFile handleFile={handleFile}>
// 				<DataInput handleFile={handleFile} />
// 				<OutTable data={state.data} cols={state.cols} />
// 				<button disabled={!state.data.length} className="b-download__btn btn" onClick={exportFile}>
// 					Скачать
// 				</button>
// 			</DragDropFile>
// 			<div className="b-results">
// 				<div className="b-calc">
// 					<h2 className="b-title2">Результаты расчётов: </h2>
// 					<div className="b-calc__items">{buildParentItems()}</div>
// 				</div>
// 			</div>
// 		</div>
// 	</>
// )
