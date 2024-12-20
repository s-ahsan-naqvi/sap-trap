import './App.css';
import { Box } from '@material-ui/core';
import SideBar from './components/SideBar/SideBar';
import ConBar from './components/ConBar/ConBar';
import ModulesCanvas from './components/ModulesCanvas/ModulesCanvas';
import { Provider } from 'react-redux';
import store from './redux/reducers/pinState';

import { useSelector, useDispatch } from 'react-redux';
import {nextStep, previousStep} from './redux/reducers/pinState';

function App() {
  
  const dispatch = useDispatch();

  const keyDown = (e) => {
    if(e.key === "ArrowRight"){
      dispatch(nextStep());
    }
    if(e.key === "ArrowLeft"){
      dispatch(previousStep());
      
    }
  }

  return (
      <Box className="App" display="flex" onKeyDown={keyDown} tabIndex="0">
        <SideBar/>
        <Box flex="1" display="flex" flexDirection="column">
          <ModulesCanvas/>
          <ConBar/>
        </Box>
      </Box>
  );
}

export default App;
