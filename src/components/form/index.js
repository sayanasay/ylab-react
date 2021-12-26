import React from "react";
import Input from "../../components/input";
import Select from "../../components/select";
import propTypes from "prop-types";
import { cn } from "@bem-react/classname";
import "./styles.css";

const Form = (props) => {
  const className = cn("Form");
  return (
    <form onSubmit={props.onSubmit} className={className()}>
      <label className={className("label")}>
        Название
        <Input onChange={props.onChangeInput} value={props.formData.title} field="title" />
      </label>
      <label className={className("label")}>
        Описание
        <Input
          onChange={props.onChangeInput}
          value={props.formData.description}
          field="description"
          type="textarea"
        />
      </label>
      <label className={className("label")}>
        Страна производитель
        <Select
          onChange={props.onChangeSelect}
          value={props.formData.maidIn?._id}
          options={props.countries}
          field="maidIn"
        />
      </label>
      <label className={className("label")}>
        Категория
        <Select
          onChange={props.onChangeSelect}
          value={props.formData.category?._id}
          options={props.categories}
          field="category"
        />
      </label>
      <label className={className("label")}>
        Год выпуска
        <Input
          onChange={props.onChangeInput}
          value={props.formData.edition}
          field="edition"
          type="number"
        />
      </label>
      <label className={className("label")}>
        Цена (₽)
        <Input
          onChange={props.onChangeInput}
          value={props.formData.price}
          field="price"
          type="number"
        />
      </label>
      <button className={className("button")} type="submit">
        Сохранить
      </button>
    </form>
  );
};

Form.propTypes = {
  onSubmit: propTypes.func,
  onChangeInput: propTypes.func,
  onChangeSelect: propTypes.func,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  field: propTypes.string,
  formData: propTypes.object,
  countries: propTypes.array,
  categories: propTypes.array,
};

Form.defaultProps = {
  onChangeInput: () => {},
  onChangeSelect: () => {},
  onSubmit: () => {},
};

export default Form;
