const pins = {
    "CP": 0,
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
}

  
export const c = {
    memory: {
        0: 0b0100001,
        1: 0b0000001,
        24: 0b000010,
        99: 0b00000001
    },
    t: 0,
    setPins: (values) => {
        // TODO

        Object.keys(pins).forEach((e,i)=>{
            pins[e] = values[i];
        })

    },
    bus: {
        value: 0b0000000,
        setValue: (value) => {
            c.bus.value = value;
            
        },
        execute: () => {

            if(isActive("L'M")){
                c.mar.execute();
            }
        }
    },
    programCounter: {
        value: 0b00000000,
        execute: () => {
            //return single
            
            if(isActive('EP')){
                c.bus.setValue(c.programCounter.value);
            }
        }
    },
    mar: {
        value: 0,
        execute: () => {
            
            if(isActive("L'M")){
                c.mar.value = c.bus.value;
            }

            c.ram.execute();
        }
    },
    ram: {
        value: 0,
        execute: () => {
            //return single
            c.ram.value = c.memory[c.mar.value];

            if(isActive("CE'")){
                c.bus.setValue(c.ram.value);
            }
        }
    },
    inputRegister: {
        value: 0,
        execute: () => {
            //return single
            // c.ram.value = c.memory[c.mar.value];
            
            if(isActive("L'I")){
                c.ram.value = c.bus.value;
            }

            if(isActive("E'I")){
                c.bus.setValue(c.inputRegister.value);
            }
        }
    },
    controlUnit: {
        value: 0,
        execute: () => {

            const opcode = c.inputRegister.value; // TODO: split binary

            if(c.t === 2){
                c.setPins([1,0,1,1,1,1, 1, 0, 0, 0,1,1]);
            }
        }
    },
    aRegister: {
        value: 0,
        execute: () => {

            
        }
    },
    bRegister: {
        value: 0,
        execute: () => {

            
        }
    },
    alu: {
        value: 0,
        execute: () => {

            
        }
    },
    outputRegister: {
        value: 0,
        execute: () => {

            
        }
    },
    binaryDisplay: {
        value: 0,
        execute: () => {

            
        }
    }

}

export const isActive = (pin, sourcePins) => {
    if(pin === undefined){
        return false;
    }
    sourcePins = sourcePins || pins;

    const val = sourcePins[pin];

    //if has prime
    if(pin.indexOf("'") !== -1){
        return !val;
    }

    return val;
}

const executionSequence = [
    c.programCounter.execute,
    c.mar.execute,
    c.ram.execute,
    c.inputRegister.execute,
    c.controlUnit.execute,
    c.aRegister.execute,
    c.bRegister.execute,
    c.alu.execute,
    c.bus.execute,
    c.outputRegister.execute,
    c.binaryDisplay.execute
];

export const run = (c) => {
    
    const states = [];
    for(let i = 0; i < 10; i++){
        const t = i % 6 + 1;

        states.push(tick(t, pins, c));
    }
    return states;
}

const tick = (t, pins, c) => {
 
    executionSequence.forEach(e=> {
        e();
    });

    const values = Object.values(pins);

    return {
        t,
        control: values.slice(0,12),
        clock: values.slice(12,16),
        values: {
            bus: c.bus.value,
            pc: c.programCounter.value,
            mar: c.mar.value,
            ram: c.ram.value,
            ir: c.inputRegister.value,
            cu: c.controlUnit.value,
            areg: c.aRegister.value,
            alu: c.alu.value,
            breg: c.bRegister.value,
            outreg: c.outputRegister.value,
            binDis: c.binaryDisplay.value,
        }

    }

}

export const steps = [
    {
        t: 1,
        control: [0,1,0,1, 1,1,1,0, 0,0,1,1],
        clock: [0,0,0,0],
        values: {
            bus: 0,
            pc: 0b0000,
            mar: 0b0000,
            ram: 0b0000,
            ir: 0b00000,
            cu: 0,
            areg: 0,
            alu: 0,
            breg: 0,
            outreg: 0,
            binDis: 0,
        },
        memory: {
            0: 0b0100001,
            1: 0b0000001,
            2: 0b0000001,
            24: 0b000010,
            99: 0b00000001
        }
    },
    {
        t: 2,
        control: [1,0,1,1, 1,1,1,0, 0,0,1,1],
        clock: [1,1,1,1],
        values: {
            bus: 0,
            pc: 0b0001,
            mar: 0b0000,
            ram: 0,
            ir: 0b0000,
            cu: 0,
            areg: 0,
            alu: 0,
            breg: 0,
            outreg: 0,
            binDis: 0,
        },
        memory: {
            0: 0b0100001,
            1: 0b0000001,
            2: 0b0000001,
            24: 0b000010,
            99: 0b00000001
        }
    },
    {
        t: 3,
        control: [0,0,1,0, 0,1,1,0, 0,0,1,1],
        clock: [0,0,0,0],
        values: {
            bus: 0b00010100,
            pc: 0b0001,
            mar: 0b0000,
            ram: 0b010100, //TODO: change random number
            ir: 0b00010100,
            cu: 0,
            areg: 0,
            alu: 0,
            breg: 0,
            outreg: 0,
            binDis: 0,
        },
        memory: {
            0: 0b0100001,
            1: 0b0000001,
            2: 0b0000001,
            24: 0b000010,
            99: 0b00000001
        }
    },
    {
        t: 4,
        control: [0,0,0,1, 1,0,1,0, 0,0,1,1],
        clock: [0,0,0,0],
        values: {
            bus: 0b000100,
            pc: 0b0001,
            mar: 0b0100,
            ram: 0b0100, //TODO: change random number
            ir: 0b00010100,
            cu: 0b0001,
            areg: 0,
            alu: 0,
            breg: 0,
            outreg: 0,
            binDis: 0,
        },
        memory: {
            0: 0b0100001,
            1: 0b0000001,
            2: 0b0000001,
            24: 0b000010,
            99: 0b00000001
        }
    }
]