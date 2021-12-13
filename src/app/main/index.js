import React, { useCallback, useEffect } from "react";
import Item from "../../components/item";
import Layout from "../../components/layout";
import List from "../../components/list";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import BasketSimple from "../../components/basket-simple";
import { useParams } from "react-router";
import ItemCard from "../../components/item-card";

function Main() {
  const { slug } = useParams();

  const select = useSelector((state) => ({
    items: state.catalog.items,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    page: state.catalog.page,
    item: state.itemPage.item,
    error: state.itemPage.error,
  }));

  useEffect(async () => {
    await store.catalog.load(select.page);
  }, [select.page]);

  useEffect(async () => {
    slug && (await store.itemPage.load(slug));
  }, [slug]);

  const store = useStore();

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    setPage: useCallback((page) => store.catalog.set(page), [store]),
    openModal: useCallback(() => store.modals.open("basket"), [store]),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <Layout head={slug ? <h1>{select.item?.title}</h1> : <h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum} />
      {slug ? (
        <ItemCard item={select.item} onAdd={callbacks.addToBasket} error={select.error} />
      ) : (
        <>
          <List items={select.items} renderItem={renders.item} />
          <Pagination count={select.count} onSet={callbacks.setPage} curPage={select.page} />
        </>
      )}
    </Layout>
  );
}

export default React.memo(Main);