import React from 'react'
// import * as R from 'ramda'
import H1 from '~ui/H1.jsx'
import SideTitle from '~ui/SideTitle.jsx'
import SideButton from '~ui/SideButton.jsx'
import Logo from '~ui/Logo.jsx'
import ScrollContainer from '~ui/ScrollContainer.jsx'
import Calculating from '~components/Calculating/Calculating.jsx'
import { capData } from './capData.jsx'

const tableHeader = [
	'№',
	'Наименование',
	'Кол-во',
	<span className="b-complex">
		<span className="b-complex__item">Uном</span>
		<span className="b-complex__item">(кВ)</span>
	</span>,
	<span className="b-complex">
		<span className="b-complex__item">Pном</span>
		<span className="b-complex__item">(кВт)</span>
	</span>,
	'ПВ(%)',
	<span className="b-complex">
		<span className="b-complex__item">Pном</span>
		<span className="b-complex__item">(100% ПВ)</span>
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
	'b-table__cell--pv',
	'b-table__cell--phompv',
	'b-table__cell--psum',
	'b-table__cell--ki',
	'b-table__cell--cos',
	'b-table__cell--tg',
]

const SecondScreen = ({ firstScreenData }) => {
	const createTableHeader = () =>
		tableHeader.map((el, i) => (
			<div key={i} className={`b-table__cell ${cellClasses[i]}`}>
				{el}
			</div>
		))

	const createTableBody = () =>
		firstScreenData.map((el, i) => (
			<div key={i} className="b-table__line">
				<div className={`b-table__cell ${cellClasses[0]}`}>{i + 1}</div>
				<div className={`b-table__cell ${cellClasses[1]}`}>{el.name}</div>
				<div className={`b-table__cell ${cellClasses[2]}`}>{el.count}</div>
				<div className={`b-table__cell ${cellClasses[3]}`}>{el.uHom}</div>
				<div className={`b-table__cell ${cellClasses[4]}`}>{el.pHom}</div>
				<div className={`b-table__cell ${cellClasses[5]}`}>{el.pv}</div>
				<div className={`b-table__cell ${cellClasses[6]}`}>{el.pHom_pv}</div>
				<div className={`b-table__cell ${cellClasses[7]}`}>{el.pSumm}</div>
				<div className={`b-table__cell ${cellClasses[8]}`}>{el.kI}</div>
				<div className={`b-table__cell ${cellClasses[9]}`}>{el.cos}</div>
				<div className={`b-table__cell ${cellClasses[10]}`}>{el.tg}</div>
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
							<ScrollContainer>
								<div className="b-table">
									<div className="b-table__header">{createTableHeader()}</div>
									<div className="b-table__body">{createTableBody()}</div>
								</div>
							</ScrollContainer>
						</div>
					</section>
					<section id="results" className="b-results__item b-results__item--right">
						<div className="b-results__item-content">
							<Calculating data={firstScreenData} />
						</div>
						<div className="b-results__item-sidebar">
							<SideTitle inverse text="итоговые расчеты" />
							<SideButton inverse text="сохранить расчеты" icon="arrow_next" link anchorId="results" />
							<SideButton inverse text="вернуться на главную" icon="arrow_next" link anchorId="results" />
						</div>
					</section>
				</div>
			</main>
		</div>
	)
}

export default SecondScreen
