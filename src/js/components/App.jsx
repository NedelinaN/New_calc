import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="b-main">
          <div className="b-title">
            <h1 className="title">
              Автоматизированный расчёт нагрузки системы электроснабжения
            </h1>
            <div className="b-description">Здесь будет описание</div>
          </div>
          <div className="b-download">
            <h4 className="b-download__title">
               Выполнить расчёт
            </h4>
            <button className="b-download__btn btn">
                Загрузить файл
            </button>
          </div>
        </div>
      </>
    );
  }
}
