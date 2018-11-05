import React, { Component } from 'react'

import {Header} from './Header/Header.jsx'
import {Main} from './Main/Main.jsx'
import {Footer} from './Footer/Footer.jsx'

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <Header/>
                <Main/>
                <Footer/>
                {/* <Background/> */}
            </>
        )
    }
}