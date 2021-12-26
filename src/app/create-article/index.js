import React, { useState, useCallback } from "react";
import Layout from "../../components/layout";
import Header from "../../containers/header";
import Spinner from "../../components/spinner";
import useInit from "../../utils/use-init";
import useStore from "../../utils/use-store";
import Form from "../../components/form";
import useSelector from "../../utils/use-selector";
import sortCategories from "../../utils/sort-categories";
import { useNavigate } from "react-router-dom";
import FormError from "../../components/form-error";

const CreateArticle = () => {
  const store = useStore();

  let navigate = useNavigate();

  useInit(async () => {
    await store.get("formInfo").loadCategories();
    await store.get("formInfo").loadCountries();
  }, []);

  const select = useSelector((state) => ({
    waiting: state.article.waiting,
    categories: state.formInfo.categories,
    countries: state.formInfo.countries,
    error: state.article.error,
    success: state.article.success,
  }));

  const categories = sortCategories(select.categories);

  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    description: "",
    maidIn: { _id: select.countries[0]?._id },
    category: { _id: categories[0]?._id },
    edition: "",
    price: "",
    name: "",
  });

  const callbacks = {
    onSubmit: useCallback(
      async (e) => {
        e.preventDefault();
        const result = await store.get("article").create(formData);
        if (result) navigate("/");
      },
      [store, formData]
    ),
    onChangeInput: useCallback((value, field) => {
      setFormData((prevState) => {
        if (field === "title") {
          return {
            ...prevState,
            name: value,
            [field]: value,
          };
        } else
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
  };

  return (
    <Layout head={<h1>Создать товар</h1>}>
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
      </Spinner>
      {select.error?.message && <FormError error={select.error} />}
    </Layout>
  );
};

export default CreateArticle;
