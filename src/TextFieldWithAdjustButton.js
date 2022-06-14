// TextFieldWithAdjustButton Component
const TextFieldWithAdjustButton = (props) => {
  // props
  // labelText
  // minusClicked
  // plusClicked
  // default

  return (
    <div>
      <label htmlFor={props.labelText}>{props.labelText} </label>
      <button
        onClick={() => {
          props.minusClicked(props.name, props.step);
        }}
        type="button"
      >
        -
      </button>
      <input
        id="house_price"
        type="number"
        onChange={(e) => props.valueChange(e, props.name)}
        value={props.mortgage[props.name]}
        step={props.step}
      />
      <button
        onClick={() => {
          props.addClicked(props.name, props.step);
        }}
        type="button"
      >
        +
      </button>
    </div>
  );
};

export default TextFieldWithAdjustButton;
