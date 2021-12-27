import React, { useCallback } from "react";
import { useParams } from "react-router";
import Layout from "../../components/layout";
import useInit from "../../utils/use-init";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Header from "../../containers/header";
import Spinner from "../../components/spinner";
import sortCategories from "../../utils/sort-categories";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form";
import FormError from "../../components/form-error";

const ManageArticle = () => {
  const store = useStore();

  const params = useParams();
  let navigate = useNavigate();

  useInit(async () => {
    if (params.id) {
      await store.get("article").load(params.id);
    } else {
      await store.get("article").setState(store.get("article").initState());
    }
  }, [params.id]);

  useInit(async () => {
    await store.get("formInfo").loadCategories();
    await store.get("formInfo").loadCountries();
  }, []);

  const select = useSelector((state) => ({
    article: state.article.data,
    waiting: state.article.waiting,
    formInfoWaiting: state.formInfo.waiting,
    categories: state.formInfo.categories,
    countries: state.formInfo.countries,
    error: state.article.error,
  }));

  const categories = sortCategories(select.categories);

  const callbacks = {
    onEdit: useCallback(
      (e, formData) => {
        e.preventDefault();
        store.get("article").edit(formData);
      },
      [store]
    ),
    onDelete: useCallback(
      async (id) => {
        const result = await store.get("article").delete(id);
        if (result) navigate("/");
      },
      [store]
    ),
    onCreate: useCallback(
      async (e, formData) => {
        e.preventDefault();
        const result = await store.get("article").create({ name: formData.title, ...formData });
        if (result) navigate("/");
      },
      [store]
    ),
  };

  return (
    <Layout head={<h1>{select.article.title ? select.article.title : "Создать товар"}</h1>}>
      <Header />
      <Spinner active={select.waiting || !!select.formInfoWaiting}>
        <Form
          article={select.article}
          onSubmit={params.id ? callbacks.onEdit : callbacks.onCreate}
          countries={select.countries}
          categories={categories}
          onDelete={callbacks.onDelete}
        />
        {select.error?.message && <FormError error={select.error} />}
      </Spinner>
    </Layout>
  );
};

export default ManageArticle;
