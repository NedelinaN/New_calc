function importAll(r) {
	r.keys().forEach(r)
}

importAll(require.context('./components', true, /\.css$/))

require('./general.css')
require('./colors.css')
require('./fonts.css')
// require("./helpers.css");
