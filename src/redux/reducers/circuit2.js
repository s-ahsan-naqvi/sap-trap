const INSTRUCTIONS = {
    LDA: 0b0000,
    ADD: 0b0001,
    SUB: 0b0010,
    OUT: 0b1110,
    HLT: 0b1111
};

export const BIN_TO_INSTRUCTIONS = {
    "0000": "LDA",
    "0001": "ADD",
    "0010": "SUB",
    "1110": "OUT",
    "1111": "HLT"
};

export class Circuit {
    memory = {

    };
    t = 0;
    
    instruction;

    pins = {
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

    values = {
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
    };

    constructor({pins, values, memory}){
        this.pins = pins || this.pins;
        this.values = values || this.values;
        this.memory = memory || this.memory;
    }

    run(){

        const states = [];
        for(let i = 0; i < 200; i++){
            const t = i % 6 + 1;
            this.t = t;
            const con = this.tick();
            
            if(con === undefined){
                break;
            }

            states.push(con);
        }
        console.log(states);
        return states;

    }

    tick(){

        const pins = this.controlUnit();
        
        //HLT
        if(pins === undefined){
            return undefined;
        }

        this.setPins(pins);

        this.programCounter();
        
        this.mar();
        this.ram();
        this.mar();
        this.inputRegister();
        
        this.ram();
        this.mar();
        this.ram();

        this.bRegister();
        // this.aRegister();
        
        this.alu();
        this.aRegister();

        this.outputRegister();
        this.binaryDisplay();

        const values = Object.values(this.pins);

        const state = {
            t: this.t,
            control: values.slice(0,12),
            clock: values.slice(12,16),
            values: {
                bus: this.values.bus,
                pc: this.values.pc,
                cu: this.values.cu,
                mar: this.values.mar,
                ram: this.values.ram,
                ir: this.values.ir,
                areg: this.values.areg,
                alu: this.values.alu,
                breg: this.values.breg,
                outreg: this.values.outreg,
                binDis: this.values.binDis
            },
            // memory: this.memory

        }

        return state;
    }

    isActive(pin){
        if(pin === undefined){
            return false;
        }
    
        const val = this.pins[pin];
    
        //if has prime
        if(pin.indexOf("'") !== -1){
            return !val;
        }
    
        return val;
    }

    setPins(values){

        Object.keys(this.pins).forEach((e,i)=>{
            this.pins[e] = values[i];
        });

    }

    bus() {
        
    }

    programCounter() {
        if(this.isActive("CP")){
            this.values.pc++;
        }

        if(this.isActive("EP")){
            this.values.bus = this.values.pc;
        }
    }

    mar() {

        if(this.isActive("L'M")){
            this.values.mar = this.values.bus;
        }

    }

    ram(){
        this.values.ram = this.memory[this.values.mar];
        if(this.isActive("CE'")){
            this.values.bus = this.values.ram;
            return;
        }
    }

    inputRegister(){

        if(this.isActive("L'I")){
            this.values.ir = this.values.bus;
        }

        if(this.isActive("E'I")){
            this.values.bus = parseInt((this.values.ir||0).toString(2).padStart(8,"0").substring(4),2);
        }

        this.values.cu = parseInt((this.values.ir||0).toString(2).padStart(8,"0").substring(0,4),2);
        // console.log("cu", this.values.cu);
    }

    controlUnit() {

        if(this.t === 1){
            return [0,1,0,1, 1,1,1,0, 0,0,1,1];
        }

        if(this.t === 2){
            return [1,0,1,1, 1,1,1,0, 0,0,1,1];
        }

        if(this.t === 3){
            return [0,0,1,0, 0,1,1,0, 0,0,1,1];
        }

        if(this.values.cu === INSTRUCTIONS.LDA){
            
            if(this.t === 4){
                return [0,0,0,1, 1,0,1,0, 0,0,1,1];
            }

            if(this.t === 5){
                return [0,0,1,0, 1,1,0,0, 0,0,1,1];
            }

        }

        if(this.values.cu === INSTRUCTIONS.ADD){
            
            if(this.t === 4){
                return [0,0,0,1, 1,0,1,0, 0,0,1,1];
            }

            if(this.t === 5){
                return [0,0,1,0, 1,1,1,0, 0,0,0,1];
            }

            if(this.t === 6){
                return [0,0,1,1, 1,1,0,0, 0,1,1,1];
            }
        }

        if(this.values.cu === INSTRUCTIONS.SUB){
            
            if(this.t === 4){
                return [0,0,0,1, 1,0,1,0, 0,0,1,1];
            }

            if(this.t === 5){
                return [0,0,1,0, 1,1,1,0, 0,0,0,1];
            }

            if(this.t === 6){
                return [0,0,1,1, 1,1,0,0, 1,1,1,1];
            }
        }

        if(this.values.cu === INSTRUCTIONS.OUT){
            
            if(this.t === 4){
                return [0,0,1,1, 1,1,1,1, 0,0,1,0];
            }

        }

        if(this.values.cu === INSTRUCTIONS.HLT){
            
            if(this.t === 4){
                return undefined;
            }

        }

        //noop
        return [0,0,1,1, 1,1,1,0, 0,0,1,1];
    }

    aRegister() {
        if(this.isActive("L'A")){
            this.values.areg = this.values.bus;
        }

        if(this.isActive("EA")){
            this.values.bus = this.values.areg;
        }
    }

    alu(){
        if(this.isActive("EU")){
            
            ///TODO: check how addition is toggled
            if(this.isActive('SU')){
                this.values.alu = this.values.breg - this.values.areg;
            }else{
                this.values.alu = this.values.breg + this.values.areg;
            }

            this.values.bus = this.values.alu;
        }
    }

    bRegister(){
        
        if(this.isActive("L'B")){
            this.values.breg = this.values.bus;
        }
    }

    outputRegister(){
        if(this.isActive("L'O")){
            this.values.outreg = this.values.bus;
        }
    }

    binaryDisplay(){
        this.values.binDis = this.values.outreg;
    }
}