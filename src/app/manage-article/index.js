import React, { useCallback, useState } from "react";
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
    await store.get("article").load(params.id);
  }, [params.id]);

  useInit(async () => {
    await store.get("formInfo").loadCategories();
    await store.get("formInfo").loadCountries();
  }, []);

  const select = useSelector((state) => ({
    article: state.article.data,
    waiting: state.article.waiting,
    categories: state.formInfo.categories,
    countries: state.formInfo.countries,
    error: state.article.error,
  }));

  const categories = sortCategories(select.categories);

  const [formData, setFormData] = useState(select.article);

  useInit(() => {
    setFormData({
      _id: select.article._id,
      title: select.article.title,
      description: select.article.description,
      maidIn: { _id: select.article.maidIn?._id },
      category: { _id: select.article.category?._id },
      edition: select.article.edition,
      price: select.article.price,
    });
  }, [select.article]);

  const callbacks = {
    onSubmit: useCallback(
      (e) => {
        e.preventDefault();
        store.get("article").edit(formData);
      },
      [store, formData]
    ),
    onChangeInput: useCallback((value, field) => {
      setFormData((prevState) => {
        return {
          ...prevState,
          [field]: value,
        };
      });
    }, []),
    onChangeSelect: useCallback((value, field) => {
      setFormData((prevState) => {
        return {
          ...prevState,
          [field]: { ...prevState[field], _id: value },
        };
      });
    }, []),
    onDelete: useCallback(
      async (id) => {
        const result = await store.get("article").delete(id);
        if (result) navigate("/");
      },
      [store]
    ),
  };

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <Header />
      <Spinner active={select.waiting}>
        <Form
          onSubmit={callbacks.onSubmit}
          onChangeInput={callbacks.onChangeInput}
          onChangeSelect={callbacks.onChangeSelect}
          formData={formData}
          countries={select.countries}
          categories={categories}
        />
        {select.error?.message && <FormError error={select.error} />}
        <button className="Form-button" onClick={() => callbacks.onDelete(formData._id)}>
          Удалить
        </button>
      </Spinner>
    </Layout>
  );
};

export default ManageArticle;
