import React, { useState } from 'react'
import * as R from 'ramda'
import XLSX from 'xlsx'
import DragDropFile from './DragDropFile.jsx'
import H1 from '~ui/H1.jsx'
import Logo from '~ui/Logo.jsx'

const vaildateRegExp = /^[0-9]*\.?[0-9]*$/g

const FirstScreen = ({ setDataFirstScreen }) => {
	const [validateError, setValidateError] = useState(false)

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
			const formattedValue = el => {
				for (let i = 1; i < 9; i++) {
					let isEmptyEl = Boolean(el[i])

					if (!isEmptyEl) {
						setValidateError(true)
						return null
					}
				}

				return {
					name: el[1],
					count: R.replace(/,/g, '.', el[2].toString()),
					uHom: R.replace(/,/g, '.', el[3].toString()),
					pHom: R.replace(/,/g, '.', el[4].toString()),
					pSumm: R.replace(/,/g, '.', el[5].toString()),
					kI: R.replace(/,/g, '.', el[6].toString()),
					cos: R.replace(/,/g, '.', el[7].toString()),
					tg: R.replace(/,/g, '.', el[8].toString()),
				}
			}

			const formattedData = R.map(formattedValue, data)

			if (!R.includes(null, formattedData)) {
				const checkValuesArr = ['count', 'uHom', 'pHom', 'pSumm', 'kI', 'cos', 'tg']
				const formattingObj = obj => R.props(checkValuesArr, obj)

				const checkingValues = arr => {
					const testValue = elArr => {
						return R.test(vaildateRegExp, elArr.toString())
					}
					return R.includes(false, R.map(testValue, arr))
				}

				const formattedDataForChecking = R.pipe(
					R.map,
					R.map(checkingValues)
				)(formattingObj, formattedData)

				const finalChecking = R.includes(true, formattedDataForChecking)

				if (finalChecking) {
					setValidateError(true)
				} else {
					setDataFirstScreen(formattedData)
				}
			}
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
						Для выполнения расчетов, пожалуйста, загрузите таблицу в следующих форматах: XLSX/XLSM, XML, XLS, XLSB.
					</div>
					<div className="b-download__activity">
						<DragDropFile text="загрузить" handleFile={handleFile} />
						{validateError ? (
							<div className="b-error">
								Исходные данные содержат недопустимые символы для расчетных единиц.
								<br />
								Данные для расчетных единиц могут содержать цифры, точки, запятые
							</div>
						) : null}
					</div>
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
