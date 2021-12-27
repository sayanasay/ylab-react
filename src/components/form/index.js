import React, { useCallback, useState } from "react";
import Input from "../../components/input";
import Select from "../../components/select";
import propTypes from "prop-types";
import { cn } from "@bem-react/classname";
import "./styles.css";
import useInit from "../../utils/use-init";

const Form = (props) => {
  const [formData, setFormData] = useState(props.article);
  const maidInProp = props.article.maidIn ? props.article.maidIn?._id : props.countries[0]?._id;
  const categoryProp = props.article.category
    ? props.article.category?._id
    : props.categories[0]?._id;

  useInit(() => {
    setFormData({
      _id: props.article._id,
      title: props.article.title,
      description: props.article.description,
      maidIn: { _id: maidInProp },
      category: { _id: categoryProp },
      edition: props.article.edition,
      price: props.article.price,
    });
  }, [props.article]);

  const onChange = useCallback((value, field) => {
    setFormData((prevState) => {
      if (field === "maidIn" || field === "category") {
        return {
          ...prevState,
          [field]: { ...prevState[field], _id: value },
        };
      } else
        return {
          ...prevState,
          [field]: value,
        };
    });
  }, []);

  const className = cn("Form");
  return (
    <form onSubmit={(e) => props.onSubmit(e, formData)} className={className()}>
      <label className={className("label")}>
        Название
        <Input onChange={onChange} value={formData.title} field="title" />
      </label>
      <label className={className("label")}>
        Описание
        <Input
          onChange={onChange}
          value={formData.description}
          field="description"
          type="textarea"
        />
      </label>
      <label className={className("label")}>
        Страна производитель
        <Select
          onChange={onChange}
          value={formData.maidIn?.value}
          options={props.countries}
          field="maidIn"
        />
      </label>
      <label className={className("label")}>
        Категория
        <Select
          onChange={onChange}
          value={formData.category?.value}
          options={props.categories}
          field="category"
        />
      </label>
      <label className={className("label")}>
        Год выпуска
        <Input onChange={onChange} value={formData.edition} field="edition" type="number" />
      </label>
      <label className={className("label")}>
        Цена (₽)
        <Input onChange={onChange} value={formData.price} field="price" type="number" />
      </label>
      <button className={className("button")} type="submit">
        Сохранить
      </button>
      <button
        type="button"
        className={className("button")}
        onClick={() => props.onDelete(formData._id)}
        disabled={!formData._id}
      >
        Удалить
      </button>
    </form>
  );
};

Form.propTypes = {
  onSubmit: propTypes.func,
  article: propTypes.object,
  countries: propTypes.array,
  categories: propTypes.array,
};

Form.defaultProps = {
  onSubmit: () => {},
};

export default Form;
