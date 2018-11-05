import React from 'react'

import {Logo} from './Logo.jsx'

export const Header = props => (
    <header className="b-header">
        <Logo/>
        <nav className="b-nav">
            <a href="#" className="b-nav__item">Галерея</a>
            <a href="#" className="b-nav__item">Стоимость</a>
            <a href="#" className="b-nav__item">Контакты</a>
        </nav>
    </header>
)