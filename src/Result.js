import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// Result Component
const Result = (mortgagePayment) => {

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
        <div>
        <Button onClick={handleOpen}>Detail</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Total Cash Needed
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Downpayment: ${mortgagePayment.mortgagePayment.downpaymentAmount} 
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Loan Closing Cost: ${mortgagePayment.mortgagePayment.loanClosingCost} 
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              ================================ 
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Total Out of Pocket Cash: ${mortgagePayment.mortgagePayment.totalCashNeeded} 
            </Typography>

            
          </Box>
        </Modal>
        </div>
    );
  };
  
  export default Result;
  





