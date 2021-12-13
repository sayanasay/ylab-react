import React from "react";
import "./styles.css";
import propTypes from "prop-types";

const ItemCard = ({ item, onAdd, error }) => {
  return (
    <>
      {!error ? (
        item && (
          <div className="Item__card">
            <p>{item.description}</p>
            <p>
              Страна производитель: <span className="Item__card__info">{item.maidIn.title}</span>
            </p>
            <p>
              Категория: <span className="Item__card__info">{item.category.title}</span>
            </p>
            <p>
              Год выпуска: <span className="Item__card__info">{item.edition}</span>
            </p>
            <p className="Item__card__price">Цена: {item.price} ₽</p>
            <button
              onClick={() => {
                onAdd(item);
              }}
            >
              Добавить
            </button>
          </div>
        )
      ) : (
        <p>Товар не найден</p>
      )}
    </>
  );
};

ItemCard.propTypes = {
  item: propTypes.object,
  onAdd: propTypes.func.isRequired,
  error: propTypes.string,
};

ItemCard.defaultProps = {
  onAdd: () => {},
  error: null,
};

export default React.memo(ItemCard);
