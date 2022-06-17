import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const totalCashNeeded = (mortgagePayment) => {
    return (
        <div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Total Cash Needed
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Downpayment: ${mortgagePayment.downpaymentAmount} 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Loan Closing Cost: ${mortgagePayment.loanClosingCost} 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          ================================ 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Total Out of Pocket Cash: ${mortgagePayment.totalCashNeeded} 
        </Typography>
        </div>
    );
};

const totalMonthlyExpense = (mortgagePayment) => {
    return (
        <div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Total Monthly Expense
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Monthly Principle: ${mortgagePayment.monthlyPrinciple} 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Monthly Interest: ${mortgagePayment.monthlyInterest} 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Property Tax: ${mortgagePayment.propertTaxPerMonth} 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          HOA: ${mortgagePayment.hoaPerMonth} 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Insurance: ${mortgagePayment.insurancePerMonth} 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          ================================ 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Total Monthly Expense: ${mortgagePayment.totalMonthlyExpense} 
        </Typography>
        </div>
    );
};

const cashflowPerMonth = (mortgagePayment) => {
    return (
        <div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Cashflow per month
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Total Monthly Income: ${mortgagePayment.rent} 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Total Monthly Expense: ${mortgagePayment.totalMonthlyExpense} 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          ================================ 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Total Monthly Cashflow: ${mortgagePayment.cashflowPerMonth} 
        </Typography>
        </div>
    );
};

const cashflowWithFactorPerMonth = (mortgagePayment) => {
    return (
        <div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Cashflow per month
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Total Monthly Income: ${mortgagePayment.rent} 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Total Monthly Expense: ${mortgagePayment.totalMonthlyExpense} 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Vacancy per month (average): ${mortgagePayment.vacancyAmountPerMonth} 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Maintenance per month (average): ${mortgagePayment.maintenanceAmountPerMonth} 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Management Fee per month: ${mortgagePayment.managementFeePerMonth} 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          ================================ 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Total Monthly Cashflow: ${mortgagePayment.cashflowWithFactorPerMonth} 
        </Typography>
        </div>
    );
};

const capRate = (mortgagePayment) => {
    return (
        <div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Capitalization Rate (%)
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Capitalization Rate = Net Operating Income / Purchase Price
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Net Opearting Income Per Month: ${mortgagePayment.netOperatingIncomeMonthly} 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Net Opearting Income Per Year: ${mortgagePayment.netOperatingIncomeAnnual} 
        </Typography>   
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Purchase Price: ${mortgagePayment.housePrice} 
        </Typography>                     
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          ================================ 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Cap Rate (%): ${mortgagePayment.capRate} 
        </Typography>
        </div>
    );
};

// Result Component
const Result = ({mortgagePayment, name}) => {

    const style = {
        // position: 'absolute' as 'absolute',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <span>
        <Button onClick={handleOpen}>Detail</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {name == "totalCashNeeded" && totalCashNeeded(mortgagePayment)}
            {name == "totalMonthlyExpense" && totalMonthlyExpense(mortgagePayment)}
            {name == "cashflowPerMonth" && cashflowPerMonth(mortgagePayment)}
            {name == "cashflowWithFactorPerMonth" && cashflowWithFactorPerMonth(mortgagePayment)}            
            {name == "capRate" && capRate(mortgagePayment)}            
          </Box>
        </Modal>
        </span>
    );
  };
  
  export default Result;
  





