import TextFieldWithAdjustButton from "./TextFieldWithAdjustButton.js";
import TextFieldWithAdjustButtonEnum from "./TextFieldWithAdjustButtonEnum.js";
// import * as React from "react";
import Button from '@mui/material/Button';
import Result from "./Result"
import RateAPI from "./RateAPI.js";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

var interestRateTimes2 = 0;

// Mortgage Component
const Mortgage = () => {

  // define the loan type options here
  const loanTypeOptions = [
    { value: 10, label: "10-Fixed" },
    { value: 15, label: "15-Fixed" },
    { value: 20, label: "20-Fixed" },
    { value: 30, label: "30-Fixed" }
  ];

  const mortgageDefault = {
    price: 480000,
    downpayRatio: 20,
    interest: 4,
    rent: 2450,
    hoa: 420,
    loanTerm: 30, // default to be 30 year fixed
    insurancePerYear: 500,
    propertyTax: 110, // in hundreds to avoid decimal numbers
    vacancyPercentage: 3,
    maintenancePercentage: 3,
    managementFeePercentage: 0
  }

  const [searchTerm, setSearchTerm] = React.useState("");
  const [mortgage, setMortgage] = React.useState(mortgageDefault);
  const [interest, setInterest] = React.useState({value: 0});

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

  // set the mortgage back to default values
  const resetMortgage = () => {
    setMortgage(mortgageDefault);
;  }

  const resetInteretRate = () => {
    setInterest(0);
  }

  const apiAddress = "https://api.api-ninjas.com/v1/interestrate"
  const apiKey = "cbUacErklh2yX2/duXxCvQ==CzXo86j5Yz6UapWK"
  const getInterest = () => {

    axios.get(apiAddress, { headers: { 'X-Api-Key': apiKey } })
    .then(response => {
        // If request is good...
        console.log(response.data);
        console.log(`US interest rate is ${response.data.central_bank_rates[0].rate_pct}`);
        setInterest({...interest, value: response.data.central_bank_rates[0].rate_pct});
     })
    .catch((error) => {
        console.log('error ' + error);
     });

  };

  const interestRateTimes2Func2 = () => {    
    interestRateTimes2 = interest.value * 2;
    console.log(`call interestRateTimes2Func2(): ${interestRateTimes2}`);
  }

    // Pass useEffect a function
    useEffect(() => {
        // This gets called after every render, by default
        // (the first one, and every one after that)
        console.log('render!');
        // const data = RateAPI()
        interestRateTimes2Func2();
    
        // If you want to implement componentWillUnmount,
        // return a function from here, and React will call
        // it prior to unmounting.
        return () => console.log('unmounting...');
      }, [interest]) // empty dependency for now
  

  const interestRateTimes2Func = () => {
    return (interest.value * 2);
  }

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
    const propertTaxPerMonth = mortgage.price * mortgage.propertyTax/10000/12;
    const insurancePerMonth = mortgage.insurancePerYear/12;
    const totalMonthlyExpense = (monthlyPayment+propertTaxPerMonth+mortgage.hoa+insurancePerMonth)
    const cashflowPerMonth = mortgage.rent - totalMonthlyExpense
    const vacancyAmountPerMonth = mortgage.rent * mortgage.vacancyPercentage/100
    const maintenanceAmountPerMonth = mortgage.rent * mortgage.maintenancePercentage/100
    const managementFeePerMonth = mortgage.rent * mortgage.managementFeePercentage/100
    const cashflowWithFactorPerMonth = mortgage.rent - totalMonthlyExpense - vacancyAmountPerMonth - 
                                       maintenanceAmountPerMonth - managementFeePerMonth;
    // Capitalization Rate = Net Operating Income / Purchase Price
    const netOperatingIncomeMonthly = mortgage.rent - propertTaxPerMonth - insurancePerMonth - mortgage.hoa
    const netOperatingIncomeAnnual = netOperatingIncomeMonthly*12
    const capRate = (netOperatingIncomeAnnual / mortgage.price) * 100
                          
    return {
      housePrice : mortgage.price.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      monthlyPrinciple: monthlyPrinciple.toFixed(2),
      monthlyInterest: monthlyInterest.toFixed(2),
      propertTaxPerMonth: propertTaxPerMonth.toFixed(2), // propertyTax is in hundreds
      hoaPerMonth: mortgage.hoa.toFixed(2),
      insurancePerMonth: insurancePerMonth.toFixed(2),  
      totalMonthlyExpense: totalMonthlyExpense.toFixed(2),
      downpaymentAmount : downpaymentAmount.toFixed(2),
      loanAmount: loanAmount.toFixed(2),
      loanClosingCost: loanClosingCost,
      totalCashNeeded : totalCashNeeded.toFixed(2),
      rent : mortgage.rent.toFixed(2),
      cashflowPerMonth: cashflowPerMonth.toFixed(2),
      cashflowWithFactorPerMonth: cashflowWithFactorPerMonth.toFixed(2),
      vacancyAmountPerMonth: vacancyAmountPerMonth.toFixed(2),
      maintenanceAmountPerMonth: maintenanceAmountPerMonth.toFixed(2),
      managementFeePerMonth: managementFeePerMonth.toFixed(2),
      netOperatingIncomeMonthly: netOperatingIncomeMonthly.toFixed(2),
      netOperatingIncomeAnnual: netOperatingIncomeAnnual.toFixed(2),
      capRate: capRate.toFixed(2)
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
 
  // Pass useEffect a function
  useEffect(() => {
    // This gets called after every render, by default
    // (the first one, and every one after that)
    console.log('render!');
    // const data = RateAPI()
    // console.log(`useEffect: data is ${data}`)

    // If you want to implement componentWillUnmount,
    // return a function from here, and React will call
    // it prior to unmounting.
    return () => console.log('unmounting...');
  }, []) // empty dependency for now

 

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
        <TextFieldWithAdjustButton
          labelText="Vacancy (%) "
          name="vacancyPercentage"
          mortgage={mortgage}
          divideByHundred={false}
          step={1} 
          minusClicked={minusClicked}
          addClicked={addClicked}
          valueChange={valueChange}
        />
        <TextFieldWithAdjustButton
          labelText="Maintenance (%) "
          name="maintenancePercentage"
          mortgage={mortgage}
          divideByHundred={false}
          step={1} 
          minusClicked={minusClicked}
          addClicked={addClicked}
          valueChange={valueChange}
        />
        <TextFieldWithAdjustButton
          labelText="Management Fee (%) "
          name="managementFeePercentage"
          mortgage={mortgage}
          divideByHundred={false}
          step={1} 
          minusClicked={minusClicked}
          addClicked={addClicked}
          valueChange={valueChange}
        />

        {/* 
        <TextFieldWithAdjustButtonEnum labelText="Interest (%)" />
        <TextFieldWithAdjustButtonEnum labelText="Loan Type" />
         */}

 
        
        <br />
        Total Cash Needed: ${mortgagePayment().totalCashNeeded} <Result name="totalCashNeeded" mortgagePayment={mortgagePayment()}></Result><br/>
        Total Monthly Payment: ${mortgagePayment().totalMonthlyExpense} <Result name="totalMonthlyExpense" mortgagePayment={mortgagePayment()}></Result><br/>
        Total Cashflow per month: <span style={{color: mortgagePayment().cashflowPerMonth < 0 ? "red" : "green"}}>
            ${mortgagePayment().cashflowPerMonth} </span>
            <Result name="cashflowPerMonth" mortgagePayment={mortgagePayment()}></Result><br/>
        Total Cashflow with factor per month: <span style={{color: mortgagePayment().cashflowWithFactorPerMonth < 0 ? "red" : "green"}}>
            ${mortgagePayment().cashflowWithFactorPerMonth} </span>
            <Result name="cashflowWithFactorPerMonth" mortgagePayment={mortgagePayment()}></Result><br/>
        Cap Rate (%): {mortgagePayment().capRate} <Result name="capRate" mortgagePayment={mortgagePayment()}></Result><br/>



        <Button variant="contained" onClick={resetMortgage}>Reset Mortgage</Button> <br/>  <br/>
        <Button variant="contained" onClick={getInterest}>Get Interest Rate From Web Service</Button>  <br/>  <br/>
        <Button variant="contained" onClick={resetInteretRate}>Reset Interest Rate</Button>  <br/>  <br/>

        
        <p> Interest Rate from Web Service: {interest.value}%</p>
        <p> Interest Rate times 2 from Function: {interestRateTimes2Func()}%</p>
        <p> Interest Rate times 2 from variable: {interestRateTimes2}%</p>

        
        
        <p style={{wordBreak: 'break-all'}}>State: ${JSON.stringify(mortgage)}</p>
        <p style={{wordBreak: 'break-all'}}>Debug: ${JSON.stringify(mortgagePayment())}</p>
      </div>
    );
  };
  
  export default Mortgage;
  