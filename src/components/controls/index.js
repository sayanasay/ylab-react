import React from "react";
import propTypes from "prop-types";
import "./styles.css";
import plural from "plural-ru";

function Controls({ onShow, cartSum, itemsTotal }) {
  console.log("Controls");
  return (
    <div className="Controls">
      <div className="Cart__info">
        В корзине:
        <span>
          {itemsTotal
            ? ` ${cartSum} ₽ / ${itemsTotal} ${plural(
                itemsTotal,
                "товар",
                "товара",
                "товаров"
              )}`
            : " пусто"}
        </span>
      </div>
      <button onClick={onShow}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onShow: propTypes.func.isRequired,
};

Controls.defaultProps = {
  onShow: () => {},
};

export default React.memo(Controls);
