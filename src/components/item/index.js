import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import plural from "plural-ru";
import "./styles.css";

function Item({ item, onAdd }) {
  console.log("Item", item.title);

  return (
    <div className={"Item" + (item.selected ? " Item_selected" : "")}>
      <div className="Item__number">{item.code}</div>
      <div className="Item__title">{item.title}</div>
      <div className="Item__actions">
        <div className="Item__price">
          {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽
        </div>
        {item.quantity ? (
          `${item.quantity} шт.`
        ) : (
          <button onClick={() => onAdd(item)}>Добавить</button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Item);
