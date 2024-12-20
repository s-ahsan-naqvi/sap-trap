// import '@testing-library/jest-dom/extend-expect';
// import Memory from './Memory';
const parseLine = require('./parsing').parseLine;
const buildMemory = require('./parsing').buildMemory;

describe('<Memory />', () => {
  test('parseLine should parse correctly', () => {
    
    expect(parseLine("01 LDA 23")).toEqual({
      address: 1,
      opcode: [0,0,0,0],
      opDisplay: "LDA",
      value: 23,
      display: "LDA 23"
    });

    expect(parseLine("99 23")).toEqual({
      address: 99,
      opcode: undefined,
      opDisplay: undefined,
      value: 23,
      display: "23"
    });

    expect(parseLine("24 HLT")).toEqual({
      address: 24,
      opcode: [1,1,1,1],
      opDisplay: "HLT",
      value: undefined,
      display: "HLT"
    });

    expect(parseLine("  03    LDA    26  ")).toEqual({
      address: 3,
      opcode: [0,0,0,0],
      opDisplay: "LDA",
      value: 26,
      display: "LDA 26"
    });

  });

  test('buildMemory should parse correctly', () => {
    
    const input = `
      00 LDA 99
      01 LDA 23
      02 SUB 99
      24 HLT
      99 1
    `;

    expect(buildMemory(input)).toEqual([
      {
        address: 0,
        opcode: [0,0,0,0],
        opDisplay: "LDA",
        value: 99,
        display: "LDA 99"
      },
      {
        address: 1,
        opcode: [0,0,0,0],
        opDisplay: "LDA",
        value: 23,
        display: "LDA 23"
      },
      {
        address: 2,
        opcode: [0,0,1,0],
        opDisplay: "SUB",
        value: 99,
        display: "SUB 99"
      },
      ...Array(21).fill(undefined),
      {
        address: 24,
        opcode: [1,1,1,1],
        opDisplay: "HLT",
        value: undefined,
        display: "HLT"
      },
      ...Array(74).fill(undefined),
      {
        address: 99,
        opcode: undefined,
        opDisplay: undefined,
        value: 1,
        display: "1"
      }
    ]);

  });

});