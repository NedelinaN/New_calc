import React, { Component } from 'react'
import { SheetJSFT } from './helpers'

export default class DataInput extends React.Component {
	constructor(props) {
		console.log('test')
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(e) {
		const files = e.target.files
		if (files && files[0]) this.props.handleFile(files[0])
	}
	render() {
		return (
			<form className="b-download__form">
				<label htmlFor="file" className="b-download__label">
					Выполнить расчёт
				</label>
				<div className="b-download__input-container">
					<input type="file" className="b-download__input" id="file" accept={SheetJSFT} onChange={this.handleChange} />
				</div>
			</form>
		)
	}
}
