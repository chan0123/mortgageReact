// TextFieldWithAdjustButton Component
const TextFieldWithAdjustButton = (props) => {

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
        id="props.name"
        type="number"
        onChange={(e) => props.valueChange(e, props.name)}
        value={props.divideByHundred? props.mortgage[props.name]/100 : props.mortgage[props.name]}
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
