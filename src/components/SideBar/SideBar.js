import React from 'react';
import PropTypes from 'prop-types';
import './SideBar.scss';
import Memory from '../Memory/Memory';
import { Box } from '@material-ui/core';

import SimulationControls from '../SimulationControls/SimulationControls'


const SideBar = () => (
  <Box className="SideBar" data-testid="SideBar" display="flex" flexDirection="column">
    <Memory/>
    <SimulationControls/>

    
  </Box>
);

SideBar.propTypes = {};

SideBar.defaultProps = {};

export default SideBar;
