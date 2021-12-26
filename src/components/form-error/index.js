import React from "react";
import { cn } from "@bem-react/classname";
import "./styles.css";

const FormError = ({ error }) => {
  const className = cn("Error");
  return (
    <div className={className()}>
      Ошибка! {error.message}:
      <ul className={className("list")}>
        {error.issues.map((el) => (
          <li key={el}>{el}</li>
        ))}
      </ul>
    </div>
  );
};

export default FormError;
