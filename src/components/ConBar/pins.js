const controlPins = {
    CP: {
        val: 1,
        display: <>C<sub>P</sub></>
    },
    EP: {
        val: 0,
        display: <>E<sub>P</sub></>
    },
    "L'M": {
        val: 0,
        display: <>L'<sub>M</sub></>
    },
    "CE'": {
        val: 0,
        display: <>CE'</>
    },
    "L'I": {
        val: 1,
        display: <>L'<sub>I</sub></>
    },
    "E'I": {
        val: 0,
        display: <>E'<sub>I</sub></>,
    },
    "L'A": {
        val: 1,
        display: <>L'<sub>A</sub></>,
    },
    "EA": {
        val: 0,
        display: <>E<sub>A</sub></>,
    },
    "SU": {
        val: 0,
        display: <>S<sub>U</sub></>,
    },
    "EU": {
        val: 0,
        display: <>E<sub>U</sub></>,
    },
    "L'B": {
        val: 0,
        display: <>L'<sub>B</sub></>,
    },
    "L'O": {
        val: 0,
        display: <>L'<sub>O</sub></>,
    },
}


const clockPins = {
    CLK: {
        val: 1,
        display: <>CLK</>
    },
    CLR: {
        val: 0,
        display: <>CLR</>
    },
    "CLK'": {
        val: 0,
        display: <>CLK'</>
    },
    "CLR'": {
        val: 1,
        display: <>CLR'</>
    },
}


const ex = {
    controlPins, 
    clockPins
}

export default ex;