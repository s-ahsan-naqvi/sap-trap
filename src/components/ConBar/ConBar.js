import React from 'react';
import PropTypes from 'prop-types';
import './ConBar.scss';
import { Box, makeStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import pins from './pins';
import { useSelector, useDispatch } from 'react-redux';
import {setControl,setClock} from '../../redux/reducers/pinState';
import Button from '@material-ui/core/Button';
import { isActive } from '../../redux/reducers/circuit';

// const activations = [0,1,0,0,0,1,1,0,1];
// const pins2 = [
//   <>C<sub>P</sub></>,
//   <>E<sub>P</sub></>,
//   <>L'<sub>M</sub></>,
//   <>CE'</>,
//   <>L'<sub>I</sub></>,
//   <>E'<sub>I</sub></>,
//   <>L'<sub>A</sub></>,
//   <>E<sub>A</sub></>,
//   <>S<sub>U</sub></>,
//   <>E<sub>U</sub></>,
//   <>L'<sub>B</sub></>,
//   <>L'<sub>O</sub></>,
// ];

const useStyles = makeStyles((theme)=>({
  active: {
    backgroundColor: green[100],
    "&:hover": {
      backgroundColor: green[200],
    }
  },
  pins: {
    fontSize: '20px',
    boxShadow: theme.shadows[10]
  },
  t: {
    fontSize: "36px",
    fontWeight: "bold",
    zIndex: 1,
    color: "#F55",
    padding: "3px 10px",
    paddingTop: "5px",
    // boxShadow: theme.shadows[10]
  },
  pinDescription: {
    position: "relative",
    top: "-3px"
  },
  binValue: {
    position: "absolute",
    bottom: "-9px",
    fontSize: "13px",
    left: "calc(50% - 2px)",
    fontWeight: "bold"
  },
}));

const ConBar = () => {

  const classes = useStyles();
  
  const dispatch = useDispatch();
  const controlPins = useSelector(e=>e.control);
  const clockPins = useSelector(e=>e.clock);
  const t = useSelector(e=>e.t);
  

  const toggle = (pin) => {
    const target = {...controlPins};
    
    target[pin] = target[pin] === 0 ? 1 : 0;
    
    dispatch(setControl(target));
  }

  const toggleClockPin = (pin) => {
    const target = {...clockPins};
    
    const pinAlt = pin.indexOf("'") === -1 ? pin + "'" : pin.replace("'", "");

    target[pin] = target[pin] === 0 ? 1 : 0;
    target[pinAlt] = target[pin];

    dispatch(setClock(target));
  }

  return (
    <Box className="ConBar" data-testid="ConBar" display="flex" flexDirection="row" alignItems="flex-end">
      <Box className={classes.pins} display="flex" bgcolor="white" flex="1">
        {Object.keys(controlPins).map((e,i)=>(
          <Button 
            onClick={()=>toggle(e)} 
            key={i} 
            style={{padding: "7px", fontSize: "20px", minWidth: "50px", width: "50px", borderRadius: "0px"}} 
            className={isActive(e, controlPins) ? classes.active : ''}
          >
            <Box className={classes.pinDescription}>
              {(pins.controlPins[e] || {}).display}
              <div></div>
              <Box className={classes.binValue}>{controlPins[e]}</Box>
            </Box>

          </Button>
        ))}
        <Box flex="1">
          
        </Box>
        <Box bgcolor={red[100]} className={classes.t}>T{t}</Box>
        {Object.keys(clockPins).map((e,i)=>(
          <Button 
            onClick={()=>toggleClockPin(e)} 
            key={i} 
            style={{padding: "7px", fontSize: "20px", minWidth: "50px", width: "50px", borderRadius: "0px"}} 
            className={isActive(e, clockPins) ? classes.active : ''}
          >
            <Box className={classes.pinDescription}>
              {(pins.clockPins[e] || {}).display}
              <div></div>
              <Box className={classes.binValue}>{clockPins[e]}</Box>
            </Box>
            {/* {(pins.clockPins[e] || {}).display} */}
          </Button>
        ))}
      </Box>
    </Box>
  )
};

ConBar.propTypes = {};

ConBar.defaultProps = {};

export default ConBar;