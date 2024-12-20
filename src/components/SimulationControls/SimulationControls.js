import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './SimulationControls.scss';
import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, IconButton, makeStyles, Slide, Slider, Snackbar, Toolbar, Tooltip, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import { useDispatch, useSelector } from 'react-redux';

import {steps} from '../../redux/reducers/circuit'
import {nextStep, previousStep, setState, setStep, setStepCount } from '../../redux/reducers/pinState'
import { Circuit } from '../../redux/reducers/circuit2';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme)=>({
  toolbar: {
    padding: "0px",
    paddingLeft: theme.spacing(1)
  },
  image: {
    borderRadius: "5px",
    boxShadow: theme.shadows[10]
  }
}));

const SimulationControls = () => {
  const classes = useStyles();
  const memory = useSelector(e=>e.memory);
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const [steps, setSteps] = useState([]);
  const [currentVersion, setCurrentVersion] = useState(-1);

  const version = useSelector(e=>e.version);

  const step = useSelector(e=>e.step) || 0;
  const dispatch = useDispatch();


  useEffect(()=>{

    if(steps === undefined){
      return;
    }

    dispatch(setState(steps[step]));
  },[step, steps, dispatch]);

  useEffect(()=>{

    // if(steps !== undefined ){
    //   return;
    // }

    if(currentVersion >= version){
      return;
    }

    setCurrentVersion(version);

    const c = new Circuit({memory});

    const states = c.run();
    dispatch(setStepCount(states.length));
    console.log("Regenerated");
    setSteps(states);
    dispatch(setStep(0));
    // console.log(states);

  },[steps, memory, version, currentVersion, dispatch]);

  const next = () => {

    dispatch(nextStep());
    
  }

  const back = () => {

    dispatch(previousStep());
  }

  return (
    <div className="SimulationControls" data-testid="SimulationControls">
      <AppBar position="relative" style={{position: 'relative'}}>
          <Toolbar variant="dense" style={{backgroundColor: "white"}}>
          <Slider
              defaultValue={0}
              aria-labelledby="discrete-slider-small-steps"
              step={1}
              marks
              min={0}
              value={step}
              max={steps.length}
              disabled
              // onChange={(e,val)=> dispatch(setStep(val))}
            />
          </Toolbar>
          <Toolbar variant="dense" className={classes.toolbar}>
            {/* <Typography variant="h6" color="inherit">
              Memory
            </Typography>
            <Box flex="1"/> */}
            <Tooltip title="Back (left arrow key)">
              <Button edge="start" color="inherit" aria-label="menu" onClick={back}>
                <UndoIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Next (right arrow key)">
              <Button edge="start" color="inherit" aria-label="menu" onClick={next}>
                {/* Step */}
                <RedoIcon />
              </Button>
            </Tooltip>
            {/* {step} */}
            <Box flex="1"></Box>

          </Toolbar>
        </AppBar>


        <Dialog
          open={isInfoOpen}
          TransitionComponent={Transition}
          keepMounted
          fullWidth
          maxWidth="lg"
          onClose={()=> setIsInfoOpen(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Box p={5}></Box>
            <Typography variant="h3">SAP 1 Architecture Simulator</Typography>
            
            <p>This simulator aims to help Educators teach how the SAP 1 Architecture works. This simulator features capabilities to support that goal.</p>

            <Box p={5}></Box>
            <Typography variant="h4">Overview</Typography>
            <p></p>
            <img alt="Playback" src="images/Help.jpg"/>

            <Box p={6}></Box>

            <Typography variant="h4">Interactive Control Pins</Typography>
            <p>Visually demonstrate how the control pins affects the connections between components.</p>
            <img className={classes.image} alt="Control Pins" src="images/control-pins.gif"/>
            
            <Box p={6}></Box>
            <Typography variant="h4">Playback controls</Typography>
            <p>Observe how the whole system interact with the memory, and which pins are changed based on the cycle time and instructions.</p>
            <img className={classes.image} alt="Playback" src="images/playback.gif"/>
            

            <Box p={6}></Box>
            <Typography variant="h4">Toggle Memory Display</Typography>
            <p style={{maxWidth: "600px"}}>Toggle between readable and binary view. Please note that when showing as MNEMONICS, the <em>data</em> memory values may <em>incorrectly</em> show as instructions. The memory doesn't really know which records are instructions or data.</p>
            <img className={classes.image} alt="Playback" src="images/toggle-view.gif"/>
            

            <Box p={6}></Box>
            <Typography variant="h4">Edit Memory and Instruction set</Typography>
            <p>Edit the instruction set and variables using this control. Please make sure to enter your data as binary. <br/>Little validation is done on this part, so ensure that you've entered a valid structure and instructions</p>
            <p>The format should be always be a 4-bit address &lt;space&gt; 8-bit value</p>
            <pre>address value</pre>
            <pre>0000 00001110</pre>
            
            Supported Instructions are:
            <pre>LDA: 0000</pre>
            <pre>ADD: 0001</pre>
            <pre>SUB: 0010</pre>
            <pre>OUT: 1110</pre>
            <pre>HLT: 1111</pre>

            <Box p={2}></Box>
            <img className={classes.image} alt="Playback" src="images/edit-memory.gif"/>
            <Box p={3}></Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=> setIsInfoOpen(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          severity="info"
          
          autoHideDuration={15000}
          // action={<Button>Show me</Button>}
          onClose={()=>setSnackbarOpen(false)}
          // TransitionComponent={transition}
          message="Need help?"
          action={
            <> 
              <Button variant="contained" color="primary" onClick={()=>{ setIsInfoOpen(true); setSnackbarOpen(false); }}>Show me around</Button>
              <Box p={1}/>
              <IconButton color="secondary" onClick={()=>setSnackbarOpen(false)}>
                <CloseIcon/>
              </IconButton>
            </>
          }
          // key={transition ? transition.name : ''}
          anchorOrigin={{vertical: 'bottom', horizontal:'right'}}
        />
    </div>
  )

};

SimulationControls.propTypes = {};

SimulationControls.defaultProps = {};

export default SimulationControls;


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});