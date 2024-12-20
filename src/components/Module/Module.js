import React from 'react';
import PropTypes from 'prop-types';
import './Module.scss';
import { Box, makeStyles } from '@material-ui/core';
import Bus from './Bus/Bus'
import styles from '../../styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    // flex: "1",
    // overflow: "hidden",
  },
  chip: {
    textShadow: "0px -1px rgb(255 255 255 / 70%), 0px 0px rgb(0 0 0 / 30%)",
    color: "rgba(0,0,0, 0.8)", // Changed to dark text
    boxShadow: theme.shadows[6], // Slightly increased shadow intensity
    borderRadius: "6px", // Softer corners
    backgroundColor: "white",
    background: "radial-gradient(circle, rgba(255,218,185,1) 30%, rgba(255,165,0,1) 120%)", // Lighter warm gradient
    borderTop: "1px solid #DDD",
    borderBottom: "1px solid #888",
    borderLeft: "1px solid #CCC",
    borderRight: "1px solid #CCC",
    zIndex: 10,
    cursor: "pointer", // Changed from "default" to "pointer" for better UX
    "&:hover": {
      background: "radial-gradient(circle, rgba(255,228,196,1) 30%, rgba(255,140,0,1) 120%)", // Brighter on hover
      boxShadow: theme.shadows[8], // More intense shadow on hover
    },
  },
  label: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "24px",
    color: "#444", // Dark gray text
    marginBottom: "10px",
  },
  value: {
    textAlign: "center",
    backgroundColor: "#F5F5F5", // Light gray background
    background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(230,230,230,1) 8%, rgba(200,200,200,1) 29%, rgba(180,180,180,1) 54%, rgba(160,160,160,1) 99%, rgba(140,140,140,1) 100%);", // Softer gradient
    color: "#333", // Dark text for contrast
    fontSize: "16px",
    fontWeight: "bold",
    padding: "3px 7px",
    borderRadius: "5px", // Softer corners
    fontFamily: "Monaco, Monospace, Consolas",
    letterSpacing: "1.5px", // Slightly tighter spacing
    boxShadow: "0px 2px 6px rgb(0 0 0 / 20%)", // Softer shadow
    cursor: "text",
    "&:hover": {
      background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(210,210,210,1) 8%, rgba(180,180,180,1) 29%, rgba(150,150,150,1) 54%, rgba(120,120,120,1) 99%, rgba(100,100,100,1) 100%);", // Brighter gradient
      boxShadow: "0px 4px 8px rgb(0 0 0 / 30%)", // Stronger shadow on hover
    },
  },
}));

const Module = ({name, size, children, left, right, top, bottom, ...rest}) => {
  const classes = useStyles();

  size = size || 8;
  const value = useSelector(e=>e.values[name]);
  
  let display = value;

  if(isNaN(value)){
    display = "".padStart(size, "X")
  }
  return (
    <Box display="flex" className={classes.root} data-testid="Module" flexDirection="column" {...rest}>
      <Box display="flex" justifyContent="center">{top}</Box>
      <Box display="flex">
        <Box display="flex" flexDirection="column" justifyContent="center">{left}</Box>
        <Box flex="1" p={3} className={classes.chip}>
          <Box className={classes.label}>{children}</Box>
          <Box display="flex" justifyContent="center">
            {/* {display} {value} */}
            <Box display="inline" className={classes.value}>{display.toString(2).padStart(size, "0")}</Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center">{right}</Box>
      </Box>
      <Box display="flex" justifyContent="center">{bottom}</Box>
    </Box>
  )
};

Module.propTypes = {};

Module.defaultProps = {};

export default Module;
