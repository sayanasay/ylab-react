import React from "react";
import "./style.css";

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({ store }) {
  function defineWord(value) {
    value = value % 100;
    let num = value % 10;
    if (value > 10 && value < 20) return "раз";
    if (num > 1 && num < 5) return "раза";
    return "раз";
  }
  return (
    <div className="App">
      <div className="App__head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="Controls">
        <button onClick={() => store.createItem()}> Добавить</button>
      </div>
      <div className="App__center">
        <div className="List">
          {store.getState().items.map((item) => (
            <div
              key={item.code}
              className={
                "List__item" + (item.selected ? " List__item_selected" : "")
              }
            >
              <div className="Item" onClick={() => store.selectItem(item.code)}>
                <div className="Item__number">{item.code}</div>
                <div className="Item__title">
                  {item.title} |
                  {item.count > 0 ? (
                    <span>
                      Выделялся {item.count} {defineWord(item.count)}
                    </span>
                  ) : null}
                </div>
                <div className="Item__actions">
                  <button onClick={() => store.deleteItem(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
