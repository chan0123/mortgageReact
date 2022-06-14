import React from "react";
import Select from "react-select";

// TextFieldWithAdjustButtonEnum Component
const TextFieldWithAdjustButtonEnum = (props) => {
  // props
  // labelText
  // minusClicked
  // plusClicked
  // fieldIsEnum

  return (
    <div>
      <Select
        value={props.mortgage[props.name]}
        onChange={(selectedOption) =>
          props.selectChange(selectedOption, props.name)
        }
        options={props.options}
      />
    </div>
  );
};

export default TextFieldWithAdjustButtonEnum;
