import XLSX from 'xlsx'

export const SheetJSFT = ['xlsx', 'xlsb', 'xlsm', 'xls', 'xml']
	.map(function(x) {
		return '.' + x
	})
	.join(',')

/* generate an array of column objects */
export const make_cols = refstr => {
	let o = [],
		C = XLSX.utils.decode_range(refstr).e.c + 1
	for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i }
	return o
}
