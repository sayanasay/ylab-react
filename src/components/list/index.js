import React from "react";
import propTypes from "prop-types";
import Item from "../item";
import "./styles.css";

function List({ items, onAddItem }) {
  console.log("List");
  return (
    <div className="List">
      {items.map((item) => (
        <div className="List__item" key={item.code}>
          <Item item={item} onAdd={onAddItem} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onAddItem: propTypes.func,
};

List.defaultProps = {
  items: [],
  onAddItem: () => {},
};

export default React.memo(List);
