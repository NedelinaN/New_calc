import { hot } from 'react-hot-loader/root'
import React, { useState } from 'react'
import FirstScreen from './components/FirstScreen/FirstScreen.jsx'
import SecondScreen from './components/SecondScreen/SecondScreen.jsx'

const App = () => {
	const [firstScreenData, setDataFirstScreen] = useState(null)

	if (firstScreenData) return <FirstScreen setDataFirstScreen={setDataFirstScreen} />

	return <SecondScreen firstScreenData={firstScreenData} />
}

export default hot(App)
