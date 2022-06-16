import TextFieldWithAdjustButton from "./TextFieldWithAdjustButton.js";
import TextFieldWithAdjustButtonEnum from "./TextFieldWithAdjustButtonEnum.js";
import * as React from "react";
import Button from '@mui/material/Button';
import Result from "./Result"

// Mortgage Component
const Mortgage = () => {

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
    loanTerm: 30, // default to be 30 year fixed
    insurancePerYear: 900,
    propertyTax: 110, // in hundreds to avoid decimal numbers
    vacancyPercentage: 5,
    maintenancePercentage: 5
  });

  const handleSearch = (event) => {
    console.log(event);
    // console.log(event.target.id)
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const roundToDecimalPlace = (number, place) => {

    return (Math.round(number * 10**place) / 10**place).toFixed(place);
  }

  const addClicked = (name, step) => {
    console.log(`addClicked, name: ${name} with step: ${step}`);
    setMortgage({ ...mortgage, [name]: mortgage[name] + step });
  };

  const minusClicked = (name, step) => {
    console.log(`minusClicked, name: ${name}`);
    if (mortgage[name] - step >= 0) {
      setMortgage({ ...mortgage, [name]: mortgage[name] - step });
    }
  };

  const mortgagePayment = () => {
    // calculate the mortgage payment
    const loanAmount = mortgage.price * (1 - mortgage.downpayRatio / 100);
    const ratePerMonth = mortgage.interest / 100 / 12;
    const numberOfTotalPayment = 12 * mortgage.loanTerm
    const monthlyPayment = (loanAmount * ratePerMonth * (1 + ratePerMonth) ** numberOfTotalPayment) /
                            ((1 + ratePerMonth) ** numberOfTotalPayment - 1);
    const downpaymentAmount = mortgage.price * mortgage.downpayRatio / 100;
    const monthlyInterest =  loanAmount * ratePerMonth;
    const monthlyPrinciple = monthlyPayment - monthlyInterest;
    const loanClosingCost = 3000 // just a fixed number for now
    const totalCashNeeded = loanClosingCost + downpaymentAmount;
    const propertTaxPerMonth = mortgage.price*mortgage.propertyTax/10000/12;
    const insurancePerMonth = mortgage.insurancePerYear/12;

    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      monthlyPrinciple: monthlyPrinciple.toFixed(2),
      monthlyInterest: monthlyInterest.toFixed(2),
      propertTaxPerMonth: propertTaxPerMonth.toFixed(2), // propertyTax is in hundreds
      hoaPerMonth: mortgage.hoa.toFixed(2),
      insurancePerMonth: insurancePerMonth.toFixed(2),  
      totalMonthlyExpense: (monthlyPayment+propertTaxPerMonth+mortgage.hoa+insurancePerMonth).toFixed(2),
      downpaymentAmount : downpaymentAmount.toFixed(2),
      loanAmount: loanAmount.toFixed(2),
      loanClosingCost: loanClosingCost,
      totalCashNeeded : totalCashNeeded.toFixed(2),
      
    };
  };

  const valueChange = (event, name) => {
    console.log(event);
    console.log("valueChange");
    setMortgage({ ...mortgage, [name]: parseInt(event.target.value, 10) });
  };

  const selectChange = (event, name) => {
    console.log("selectChange");
    console.log(`selction option is ${JSON.stringify(event)}`);
    setMortgage({ ...mortgage, loanTerm: event.target.value });
  };

    return (
        <div>
        
        <br/>
        
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
          labelText="Down Payment Ratio (%)"
          name="downpayRatio"
          mortgage={mortgage}
          step={5}
          minusClicked={minusClicked}
          addClicked={addClicked}
          valueChange={valueChange}
        />
        <TextFieldWithAdjustButton
          labelText="Interet Rate (%)"
          name="interest"
          mortgage={mortgage}
          step={0.125.toFixed(3)}
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
        <TextFieldWithAdjustButton
          labelText="Insurance Per Year ($)"
          name="insurancePerYear"
          mortgage={mortgage}
          step={50}
          minusClicked={minusClicked}
          addClicked={addClicked}
          valueChange={valueChange}
        />
        <TextFieldWithAdjustButton
          labelText="Property Tax Per Year (%) "
          name="propertyTax"
          mortgage={mortgage}
          divideByHundred={true}
          step={10} // 0.1, times 100 to avoid decimal
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
        <p style={{wordBreak: 'break-all'}}>HOA: ${JSON.stringify(mortgage)}</p>
        <p style={{wordBreak: 'break-all'}}>Debug: ${JSON.stringify(mortgagePayment())}</p>
        <p>Mortgage Payment: ${mortgagePayment().monthlyPayment}</p>
  
        <Button variant="contained">Hello World</Button>
        <Result mortgagePayment={mortgagePayment()}></Result>
      </div>
    );
  };
  
  export default Mortgage;
  