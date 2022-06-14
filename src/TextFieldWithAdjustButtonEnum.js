// TextFieldWithAdjustButtonEnum Component
const TextFieldWithAdjustButtonEnum = (props) => {
    // props
    // labelText
    // minusClicked
    // plusClicked
    // fieldIsEnum

    
    return (
      <div>       

        <label htmlFor={props.labelText}>{props.labelText} </label>
        <button onClick={props.minusClicked} type="button">-</button>
        <input id="house_price" type="number" onChange={props.HousePriceChange} readOnly/>
        <button onClick={props.plusClicked} type="button">+</button>
        

      </div>
    );
  
  }

  export default TextFieldWithAdjustButtonEnum;
