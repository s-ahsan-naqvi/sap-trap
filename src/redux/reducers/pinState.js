import { createSlice, configureStore } from '@reduxjs/toolkit'


const controlPins = {
  "CP": 1,
  "EP": 0,
  "L'M": 1,
  "CE'": 1,
  "L'I": 1,
  "E'I": 1,
  "L'A": 1,
  "EA": 0,
  "SU": 0,
  "EU": 0,
  "L'B": 1,
  "L'O": 1,
}


const clockPins = {
  "CLK": 0,
  "CLR": 0,
  "CLK'": 0,
  "CLR'": 0,
}


export const clockMap = ["CLK","CLR","CLK'","CLR'"];
export const controlMap = ["CP","EP","L'M","CE'","L'I","E'I","L'A","EA","SU","EU","L'B","L'O"];

const pinsSlice = createSlice({
  name: 'pins',
  initialState: {
    version: 0,
    view: 'binary',
    step: 0,
    steps: 0,
    t: 1,
    values: {
      bus: 0b00000,
      pc: 0b0000,
      mar: 0b00000,
      ram: NaN,
      ir: NaN,
      cu: NaN,
      areg: NaN,
      alu: NaN,
      breg: NaN,
      outreg: NaN,
      binDis: NaN,
    },
    memory: {
      
      0: 0b00001111,
      1: 0b00011110,
      2: 0b11100000,
      3: 0b11110000,
      14: 0b00000101,
      15: 0b00000001
      
    },
    control: controlPins,
    clock: clockPins,
    value: 0
  },
  reducers: {
    setClock: (state, {payload}) => {
      state.clock = payload;
    },
    setControl: (state, {payload}) => {
      // console.log(payload);
      state.control = payload;
    },
    reset: (state, {payload}) => {
      state.version += 1;
      state.memory = payload;
    },
    setState: (state, {payload})=>{


      if(payload === undefined){
        return;
      }

      state.values = payload.values;

      const control = {};
      controlMap.forEach((e,i)=>{
        control[e] = payload.control[i];
      });

      const clock = {};
      clockMap.forEach((e,i)=>{
        clock[e] = payload.clock[i];
      });
      state.t = payload.t;
      state.control = control;
      state.clock = clock;
    },
    setStepCount: (state, {payload}) =>{
      state.steps = payload;
    },
    setStep: (state, {payload}) => {
      state.step = payload;
    },
    nextStep: (state) => {
      
      if(state.step >= state.steps){
        return;
      }

      state.step += 1;
    },
    previousStep: (state) => {
      if(state.step === 0){
        return;
      }

      state.step -= 1;
    },
    toggleView: (state) => {
      
      if(state.view === 'binary'){
        state.view = "readable";
        return;
      }

      state.view = 'binary';
    },
  }
})

export const { setControl, setClock, setState, nextStep, setStepCount, setStep, reset, previousStep, toggleView } = pinsSlice.actions


const store = configureStore({
  reducer: pinsSlice.reducer
})

export default store;

// Can still subscribe to the store
// store.subscribe(() => console.log(store.getState()))
