import React from 'react';
import PropTypes from 'prop-types';
import './MemoryRecord.scss';
import { Box, makeStyles } from '@material-ui/core';
import { blue, blueGrey } from '@material-ui/core/colors';
import { BIN_TO_INSTRUCTIONS } from '../../redux/reducers/circuit2';


const MemoryRecord = ({address, value, view, isCurrentInstruction, isActive }) => {
  
  address = parseInt(address);
  value = parseInt(value);

  let addressDisplay = address.toString(2).padStart(4,"0");
  let valueDisplay = value.toString(2).padStart(8,"0");

  if(view === 'readable'){
    addressDisplay = address.toString().padStart(2,"0");
    
    const instruction = BIN_TO_INSTRUCTIONS[valueDisplay.substring(0,4)];

    valueDisplay = instruction + " " + parseInt(valueDisplay.substring(4),2).toString(2).padStart(4,"0");
    
  }

  if(address === "..."){
    return (
      <Box className="MemoryRecord placeholder" data-testid="MemoryRecord">
        {/* <Box p={2} bgcolor={blue[100]} width="25px">{(address + "").padStart(2,"0")}</Box> */}
        <Box p={1} flex="1">...</Box>
      </Box>
    )
  }

  return (
    <Box className="MemoryRecord" data-testid="MemoryRecord" isactiveinstruction={!!isCurrentInstruction+""} isactive={!!isActive+""}>
      {/* Current: {JSON.stringify(isCurrentInstruction)} <br></br>
      IsActive: {JSON.stringify(isActive)} */}
      <Box p={2} bgcolor={blue[100]} minWidth="25px">{addressDisplay}</Box>
      <Box p={2}>{valueDisplay}</Box>
    </Box>
  )
};

MemoryRecord.propTypes = {};

MemoryRecord.defaultProps = {};

export default MemoryRecord;
