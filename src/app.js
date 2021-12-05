import React, { useCallback, useState } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import CartModal from "./components/cartModal";

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({ store }) {
  console.log("App");

  const [isShowCart, setIsShowCart] = useState(false);

  const callbacks = {
    onAddItem: useCallback((item) => store.addItem(item), [store]),
    onShowCart: useCallback(() => setIsShowCart(true), [isShowCart]),
    onHideCart: useCallback(() => setIsShowCart(false), [isShowCart]),
  };

  const itemsInCart = store.getState().cart;
  const cartSum = itemsInCart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const itemsTotal = itemsInCart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {isShowCart && (
        <CartModal
          onHideCart={callbacks.onHideCart}
          items={itemsInCart}
          cartSum={cartSum}
          itemsTotal={itemsTotal}
        />
      )}
      <Layout head={<h1>Магазин</h1>}>
        <Controls
          onShow={callbacks.onShowCart}
          cartSum={cartSum}
          itemsTotal={itemsTotal}
        />
        <List items={store.getState().items} onAddItem={callbacks.onAddItem} />
      </Layout>
    </>
  );
}

export default App;
