import * as React from 'react'
import TextFieldWithAdjustButton from './TextFieldWithAdjustButton.js'
import TextFieldWithAdjustButtonEnum from './TextFieldWithAdjustButtonEnum.js'
import './App.css';

const title = "ABC";

// List Component
const List = (props) => {
  return (
  <div>
    searchText={props.searchText}
  <ul>
    {props.list.map((item) => {
      return (
        <li key={item}>
          {item}
        </li>
      );
    })}
  </ul>
  </div>
  );
}

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

}


function App() {

  const list = [1, 2, 3, 4]

  const [searchTerm, setSearchTerm] = React.useState("")
  const [mortgage, setMortgage] = React.useState({price: 400000, downpayRatio: 20, interest:4, rent: 2000, hoa: 200})

  const handleSearch = (event) => {
    console.log(event)
    // console.log(event.target.id)
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const housePriceMinusClicked = (event) => {
    // console.log(event)
    setMortgage({...mortgage, price: mortgage.price - 5000})  
  }

  const hoaMinusClicked = (event) => {
    // console.log(event)
    setMortgage({...mortgage, hoa: mortgage.hoa - 50})  
  }

  const addClicked = (name, step) => {
    console.log(`addClicked, name: ${name}`)
    setMortgage({...mortgage, [name]: mortgage[name] + step})  
    
  }
  const minusClicked = (name, step) => {
    console.log(`minusClicked, name: ${name}`)
    if (mortgage[name] - step >= 0) {
      setMortgage({...mortgage, [name]: mortgage[name] - step})  
    }
  }

  const mortgagePayment = () => {

    return mortgage.price / 2 + mortgage.hoa
  }


  const valueChange = (event, name) => {
    console.log(event)
    console.log("valueChange")
    setMortgage({...mortgage, [name]: parseInt(event.target.value)})  

  }
  

  return (

    <div>
      <h1>
        Hello {title}!
      </h1>

      <Search onSearch={handleSearch} /> {/* handleSearch is a function, which is a Callback at top-level */}
      <br />
      <List list={list} searchText={searchTerm}/>

      <br />
      <TextFieldWithAdjustButton labelText="House Price ($)" name="price" mortgage={mortgage} step={5000} minusClicked={minusClicked} addClicked={addClicked} valueChange={valueChange}/>
      <TextFieldWithAdjustButton labelText="Rent ($) " name="rent" mortgage={mortgage} step={100} minusClicked={minusClicked} addClicked={addClicked} valueChange={valueChange}/>
      <TextFieldWithAdjustButton labelText="HOA ($)" name="hoa" mortgage={mortgage} step={50} minusClicked={minusClicked} addClicked={addClicked} valueChange={valueChange}/>

      {/* <TextFieldWithAdjustButtonEnum labelText="Downpay (%)" />
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
