import '@testing-library/jest-dom/extend-expect';

import { Circuit } from './circuit2';

describe('circuit', () => {
  test('it should mount', () => {



    const c = new Circuit({
        "CP": 1,
        "EP": 0,
        "L'M": 0,
        "CE'": 0,
        "L'I": 0,
        "E'I": 0,
        "L'A": 0,
        "EA": 0,
        "SU": 0,
        "EU": 0,
        "L'B": 0,
        "L'O": 0,
        "CLK": 0,
        "CLR": 0,
        "CLK'": 1,
        "CLR'": 1,
    });

    const states = c.run();

    console.log(JSON.stringify(states, null, "\t"));

  });
});