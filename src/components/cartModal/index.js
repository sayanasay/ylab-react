import React from "react";
import Item from "../item";
import propTypes from "prop-types";
import "./styles.css";

const CartModal = ({ onHideCart, items, cartSum, itemsTotal }) => {
  return (
    <div className="Backdrop">
      <div className="Cart">
        <div className="Cart__head">
          <h2>Корзина</h2>
          <button onClick={onHideCart}>Закрыть</button>
        </div>
        {items.length === 0 && <div className="Cart__empty">Корзина пуста</div>}
        <div className="List">
          {items.map((item) => (
            <div className="List__item" key={item.code}>
              <Item item={item} />
            </div>
          ))}
        </div>
        <div className="Item__actions Cart__sum">
          <div className="Item__price">Итого</div>
          <div className="Item__price">{cartSum} ₽</div>
          {itemsTotal} шт.
        </div>
      </div>
    </div>
  );
};

CartModal.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onHideCart: propTypes.func.isRequired,
  cartSum: propTypes.string.isRequired,
  itemsTotal: propTypes.number.isRequired,
};

CartModal.defaultProps = {
  items: [],
  onHideCart: () => {},
};

export default CartModal;
