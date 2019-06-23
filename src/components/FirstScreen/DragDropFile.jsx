import React, { useState } from 'react'
import * as R from 'ramda'

const formatted = el => '.' + el
const SheetJSFT = R.pipe(
	R.map,
	R.join(',')
)(formatted, ['xlsx', 'xlsb', 'xlsm', 'xls', 'xml'])

const DragDropFile = ({ handleFile, text }) => {
	const [hint, setHint] = useState('Файл не выбран')

	function suppress(evt) {
		evt.stopPropagation()
		evt.preventDefault()
	}

	function onDrop(evt) {
		evt.stopPropagation()
		evt.preventDefault()
		const files = evt.dataTransfer.files
		if (files && files[0]) handleFile(files[0])
	}

	function handleChange(e) {
		const files = e.target.files
		if (files && files[0]) {
			const extension = files[0].name.match(/\.[0-9a-z]+$/i)
			window.extention = extension[0]
			setHint(files[0].name)
			handleFile(files[0])
		}
	}

	return (
		<div className="b-dnd" onDrop={onDrop} onDragEnter={suppress} onDragOver={suppress}>
			<div className="b-dnd__download">
				<label htmlFor="file" className="btn">
					загрузить
				</label>
				<input type="file" id="file" accept={SheetJSFT} onChange={handleChange} />
			</div>
			<div className="b-hint">{hint}</div>
		</div>
	)
}

export default DragDropFile
