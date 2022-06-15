import React from "react";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// TextFieldWithAdjustButtonEnum Component
const TextFieldWithAdjustButtonEnum = ({name, mortgage, options, selectChange}) => {

  return (
    <div>

    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Loan Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mortgage[name]}
          label="Loan Type"
          onChange={(event) =>
            selectChange(event, name)
          }
        >
          {options.map(({ value, label }, index) => <MenuItem key={label} value={value} >{label}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>



      {/* <Select
        value={props.mortgage[props.name]}
        onChange={(selectedOption) =>
          props.selectChange(selectedOption, props.name)
        }
        options={props.options}
      /> */}
    </div>
  );
};

export default TextFieldWithAdjustButtonEnum;
