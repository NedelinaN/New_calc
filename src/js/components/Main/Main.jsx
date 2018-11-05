import React from 'react'

import  {Decor} from './Decor.jsx'

export const Main = props => (
    <main className="b-main">
        <div className="b-main__left">
            <Decor/>
        </div>
        <div className="b-main__right">
            <h2>Мы предлагаем:</h2>
            <ul className="b-services">
                <li data-number="01." className="b-services__item">Разумные цены</li>
                <li data-number="02." className="b-services__item">Гибкий график занятий</li>
                <li data-number="03." className="b-services__item">Скидки школьникам и студентам</li>
                <li data-number="04." className="b-services__item">Индивидуальные занятия</li>
                <li data-number="05." className="b-services__item">Профессиональные преподаватели</li>
                <li data-number="06." className="b-services__item">Новое и качественное музыкальное оборудование</li>
                <li data-number="07." className="b-services__item">Различные стилевые направления (от метала до эстрады и джаза)</li>
            </ul>
            {/* <button className="btn">Записаться</button> */}
        </div>
    </main>
)