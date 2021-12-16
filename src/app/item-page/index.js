import React, { useCallback, useEffect } from "react";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import BasketSimple from "../../components/basket-simple";
import { useParams } from "react-router";
import ItemCard from "../../components/item-card";

function ItemPage() {
  const { slug } = useParams();

  const select = useSelector((state) => ({
    item: state.itemPage.item,
    error: state.itemPage.error,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(async () => {
    slug && (await store.itemPage.load(slug));
  }, [slug]);

  const store = useStore();

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open("basket"), [store]),
  };

  return (
    <Layout head={<h1>{select.item?.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum} />
      <ItemCard item={select.item} onAdd={callbacks.addToBasket} error={select.error} />
    </Layout>
  );
}

export default React.memo(ItemPage);
