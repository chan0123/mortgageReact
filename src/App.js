import * as React from "react";
import TextFieldWithAdjustButton from "./TextFieldWithAdjustButton.js";
import TextFieldWithAdjustButtonEnum from "./TextFieldWithAdjustButtonEnum.js";
import "./App.css";

const title = "ABC";

// List Component
const List = (props) => {
  return (
    <div>
      searchText={props.searchText}
      <ul>
        {props.list.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
};

// Search Component
const Search = (props) => {
  // Search has a props onSearch
  // passing from top level

  const handleChange = (event) => {
    console.log(event);
    console.log(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={props.onSearch} />
    </div>
  );
};

function App() {
  const list = [1, 2, 3, 4];

  // define the loan type options here
  const loanTypeOptions = [
    { value: 10, label: "10-Fixed" },
    { value: 15, label: "15-Fixed" },
    { value: 20, label: "20-Fixed" },
    { value: 30, label: "30-Fixed" }
  ];

  const [searchTerm, setSearchTerm] = React.useState("");
  const [mortgage, setMortgage] = React.useState({
    price: 400000,
    downpayRatio: 20,
    interest: 4,
    rent: 2000,
    hoa: 200,
    loanTerm: loanTypeOptions[3] // default to be 30 year fixed
  });

  const handleSearch = (event) => {
    console.log(event);
    // console.log(event.target.id)
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const addClicked = (name, step) => {
    console.log(`addClicked, name: ${name}`);
    setMortgage({ ...mortgage, [name]: mortgage[name] + step });
  };
  const minusClicked = (name, step) => {
    console.log(`minusClicked, name: ${name}`);
    if (mortgage[name] - step >= 0) {
      setMortgage({ ...mortgage, [name]: mortgage[name] - step });
    }
  };

  const mortgagePayment = () => {
    return mortgage.price / 2 + mortgage.hoa;
  };

  const valueChange = (event, name) => {
    console.log(event);
    console.log("valueChange");
    setMortgage({ ...mortgage, [name]: parseInt(event.target.value, 10) });
  };

  const selectChange = (selectedOption, name) => {
    console.log("selectChange");
    console.log(`selction option is ${JSON.stringify(selectedOption)}`);
    setMortgage({ ...mortgage, loanTerm: selectedOption });
  };

  return (
    <div>
      <h1>Hello {title}!</h1>
      <Search onSearch={handleSearch} />{" "}
      {/* handleSearch is a function, which is a Callback at top-level */}
      <br />
      <List list={list} searchText={searchTerm} />
      <br />
      <TextFieldWithAdjustButton
        labelText="House Price ($)"
        name="price"
        mortgage={mortgage}
        step={5000}
        minusClicked={minusClicked}
        addClicked={addClicked}
        valueChange={valueChange}
      />
      <TextFieldWithAdjustButton
        labelText="Rent ($) "
        name="rent"
        mortgage={mortgage}
        step={100}
        minusClicked={minusClicked}
        addClicked={addClicked}
        valueChange={valueChange}
      />
      <TextFieldWithAdjustButton
        labelText="HOA ($)"
        name="hoa"
        mortgage={mortgage}
        step={50}
        minusClicked={minusClicked}
        addClicked={addClicked}
        valueChange={valueChange}
      />
      <TextFieldWithAdjustButtonEnum
        mortgage={mortgage}
        name="loanTerm"
        options={loanTypeOptions}
        selectChange={selectChange}
      />
      {/* 
      <TextFieldWithAdjustButtonEnum labelText="Interest (%)" />
      <TextFieldWithAdjustButtonEnum labelText="Loan Type" />
       */}
      <p>House Price: ${mortgage.price}</p>
      <p>HOA: ${JSON.stringify(mortgage)}</p>
      <p>Mortgage Payment: {mortgagePayment()}</p>
    </div>
  );
}

export default App;
