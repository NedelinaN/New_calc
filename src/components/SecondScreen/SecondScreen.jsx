import React, { useState } from 'react'
import XLSX from 'xlsx'
// import * as R from 'ramda'
import H1 from '~ui/H1.jsx'
import SideTitle from '~ui/SideTitle.jsx'
import SideButton from '~ui/SideButton.jsx'
import Logo from '~ui/Logo.jsx'
import ScrollContainer from '~ui/ScrollContainer.jsx'
import Calculating from '~components/Calculating/Calculating.jsx'

const tableHeader = [
	'№',
	'Наименование ЭП',
	'Кол-во',
	<span className="b-complex">
		<span className="b-complex__item">Uном</span>
		<span className="b-complex__item">(кВ)</span>
	</span>,
	<span className="b-complex">
		<span className="b-complex__item">Pном</span>
		<span className="b-complex__item">(кВт)</span>
	</span>,
	<span className="b-complex">
		<span className="b-complex__item">Pсум</span>
		<span className="b-complex__item">(кВт)</span>
	</span>,
	'Kи',
	'cosφ',
	'tgφ',
]
const cellClasses = [
	'b-table__cell--number',
	'b-table__cell--name',
	'b-table__cell--count',
	'b-table__cell--uhom',
	'b-table__cell--phom',
	'b-table__cell--psum',
	'b-table__cell--ki',
	'b-table__cell--cos',
	'b-table__cell--tg',
]

const headerDesc = [
	'Порядковый номер',
	'Наименование электроприемника',
	'Количество электроприемников',
	'Номинальное напряжение',
	'Номинальная мощность',
	'Суммарная мощность',
	'Коэффициент использования',
	'Коэффициент активной мощности',
	'Коэффициент реактивной мощности',
]

const SecondScreen = ({ firstScreenData, setDataFirstScreen }) => {
	const [outputCalculating, setOutputCalculating] = useState(null)

	const createTableHeader = () =>
		tableHeader.map((el, i) => (
			<div key={i} data-desc={headerDesc[i]} className={`b-table__cell ${cellClasses[i]}`}>
				{el}
			</div>
		))

	function exportFile() {
		// добавляем эту функцию в наш компонент SecondPAge.jsx, и вешаем вызов функции на onClick кнопки выгрузки результата

		const outputData = [
			['Название величины', 'Значение'],
			['Эффективное число ЭП, шт', outputCalculating.outputResults[0]],
			['Активная мощность, кВт', outputCalculating.outputResults[1]],
			['Реактивная мощность, кВАр', outputCalculating.outputResults[2]],
			['Полная мощность, кВА', outputCalculating.outputResults[3]],
			['Расчетный ток, А', outputCalculating.outputResults[4]],
		]

		const middleData = [
			['Kи∙Pсум', 'n∙Pсум', 'Pн∙Pн', 'Pн∙cosϕ', 'n∙Pн∙Pн', 'Kи∙Pн', 'Kи∙Pн∙tgϕ', 'Kи∙Pсум∙tgϕ', 'Kи∙Pн∙cosϕ', 'Kи∙n∙cosϕ'],
			...outputCalculating.middleResults,
		]

		const middle = XLSX.utils.aoa_to_sheet(middleData) // создание листа книги промежуточные
		const final = XLSX.utils.aoa_to_sheet(outputData) // создание листа книги финальные
		const wb = XLSX.utils.book_new() // создание книги

		const widthMiddleCols = [{ wch: 8 }, { wch: 8 }, { wch: 8 }, { wch: 8 }, { wch: 8 }, { wch: 8 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }]
		const widthFinalCols = [{ wch: 25 }, { wch: 15 }]

		middle['!cols'] = widthMiddleCols
		final['!cols'] = widthFinalCols

		XLSX.utils.book_append_sheet(wb, middle, 'Промежуточные_расчеты') // добавление листа в книгу промежуточные
		XLSX.utils.book_append_sheet(wb, final, 'Расчетные_величины') // добавление листа в книгу финальные
		XLSX.writeFile(wb, 'results.xlsx') // Создает файл формата xlsx
	}

	const createTableBody = () =>
		firstScreenData.map((el, i) => (
			<div key={i} className="b-table__line">
				<div className={`b-table__cell ${cellClasses[0]}`}>{i + 1}</div>
				<div className={`b-table__cell ${cellClasses[1]}`}>{el.name}</div>
				<div className={`b-table__cell ${cellClasses[2]}`}>{el.count}</div>
				<div className={`b-table__cell ${cellClasses[3]}`}>{el.uHom}</div>
				<div className={`b-table__cell ${cellClasses[4]}`}>{el.pHom}</div>
				<div className={`b-table__cell ${cellClasses[5]}`}>{el.pSumm}</div>
				<div className={`b-table__cell ${cellClasses[6]}`}>{el.kI}</div>
				<div className={`b-table__cell ${cellClasses[7]}`}>{el.cos}</div>
				<div className={`b-table__cell ${cellClasses[8]}`}>{el.tg}</div>
			</div>
		))
	return (
		<div className="b-container">
			<header className="b-header">
				<Logo className="b-logo--small" />
			</header>
			<main className="b-main b-main--calculations">
				<H1 text="Результаты расчетов" />
				<div className="b-results">
					<section className="b-results__item">
						<div className="b-results__item-sidebar">
							<SideTitle text="входные данные" />
							<SideButton text="перейти к расчетам" icon="arrow_next" link anchorId="results" />
						</div>
						<div className="b-results__item-content">
							<div className="b-table">
								<div className="b-table__header">{createTableHeader()}</div>
							</div>
							<ScrollContainer>
								<div className="b-table">
									<div className="b-table__body">{createTableBody()}</div>
								</div>
							</ScrollContainer>
						</div>
					</section>
					<section id="results" className="b-results__item b-results__item--right">
						<div className="b-results__item-content">
							<Calculating data={firstScreenData} outputCalculating={outputCalculating} setOutputCalculating={setOutputCalculating} />
						</div>
						<div className="b-results__item-sidebar">
							<SideTitle inverse text="итоговые расчеты" />
							<SideButton
								style={{ backgroundColor: '#c0c0c0' }}
								inverse
								text="сохранить расчеты"
								icon="download"
								anchorId="results"
								onClick={exportFile}
							/>
							<SideButton inverse text="вернуться на главную" icon="return" anchorId="results" onClick={() => setDataFirstScreen(null)} />
						</div>
					</section>
				</div>
			</main>
		</div>
	)
}

export default SecondScreen
