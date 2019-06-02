import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'
import XLSX from 'xlsx'

import DragDropFile from './DragDropFile.jsx'
import DataInput from './DataInput.jsx'
import OutTable from './OutTable.jsx'
import { make_cols } from './helpers'
import { calcData } from './calcData'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
			cols: [] /* Array of column objects e.g. { name: "C", K: 2 } */,
		}
		this.handleFile = this.handleFile.bind(this)
		this.exportFile = this.exportFile.bind(this)
		// this.buildParentItems = this.buildParentItems.bind(this)
	}
	handleFile(file /*:File*/) {
		/* Boilerplate to set up FileReader */
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
			const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
			/* Update state */
			this.setState({ data: data, cols: make_cols(ws['!ref']) })
		}
		if (rABS) reader.readAsBinaryString(file)
		else reader.readAsArrayBuffer(file)
	}
	exportFile() {
		/* convert state to workbook */
		const ws = XLSX.utils.aoa_to_sheet(this.state.data)
		const wb = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, 'result.xlsx')
	}

	buildParentItems() {
		let parentItems = []

		calcData.forEach((elParent, index) => {
			parentItems.push(
				<div className="b-calc__item" key={index}>
					{this.buildChildItems(elParent)}
				</div>
			)
		})

		return parentItems
	}

	buildChildItems(elParent) {
		let childItems = []

		elParent.forEach((elChild, index) => {
			childItems.push(
				<div className="b-calc__item-line" key={index}>
					<div className="b-calc__item-prop">{elChild.prop}</div>
					<div className="b-calc__item-value">{elChild.value}</div>
				</div>
			)
		})

		return childItems
	}

	render() {
		return (
			<>
				<div className="b-main">
					<div className="b-title">
						<h1 className="title">Автоматизированный расчёт нагрузки системы электроснабжения</h1>
						<div className="b-description">Здесь будет описание</div>
					</div>
					<DragDropFile handleFile={this.handleFile}>
						<DataInput handleFile={this.handleFile} />
						<OutTable data={this.state.data} cols={this.state.cols} />
						{/* <button
              disabled={!this.state.data.length}
              className="b-download__btn btn"
              onClick={this.exportFile}
            >
              Скачать
            </button> */}
					</DragDropFile>
					<div className="b-results">
						<div className="b-calc">
							<h2 className="b-title2">Результаты расчётов: </h2>
							<div className="b-calc__items">{this.buildParentItems()}</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default hot(App)
