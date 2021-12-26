import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn } from "@bem-react/classname";
import "./styles.css";

function Select(props) {
  // CSS классы по БЭМ
  const className = cn("Select");

  const onSelect = useCallback(
    (e, field) => {
      props.onChange(e.target.value, field);
    },
    [props.onChange]
  );

  return (
    <select className={className()} onChange={(e) => onSelect(e, props.field)} value={props.value}>
      {props.options.map((item) => (
        <option key={item._id} value={item._id}>
          {item.title}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  options: propTypes.arrayOf(propTypes.object).isRequired,
  value: propTypes.any,
  onChange: propTypes.func,
  field: propTypes.string,
};

Select.defaultProps = {
  onChange: () => {},
};

export default React.memo(Select);