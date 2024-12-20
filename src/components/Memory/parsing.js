const OPCODE_MAPPING = {
    LDA: [0,0,0,0],
    ADD: [0,0,0,1],
    SUB: [0,0,1,0],
    OUT: [1,1,1,0],
    HLT: [1,1,1,1]
}

// 01 ADD 23
// 02 HLT
// 99 1
const buildMemory = (records) => {
    records = records.trim();
    records = records.split("\n");

    const ret = [];
    let current = parseLine(records.shift());

    for(var i = 0; i< 16; i++){

        if(current === undefined || current.address > i){
            ret.push(undefined);
            continue;
        }

        ret.push(current);

        if(records.length > 0){
            current = parseLine(records.shift());            
        }
    }

    return ret;

}

//01 ADD 23
const parseLine = (line) => {

    line = line.trim();
    line = line.replace(/ +/g, ' ');

    const parts = line.split(" ");
    
    let value = parseInt(parts[2] || parts[1]);
    if(isNaN(value)){
        value = undefined;
    }

    return {
        address: parseInt(parts[0]),
        opcode: OPCODE_MAPPING[parts[1]],
        opDisplay: OPCODE_MAPPING[parts[1]] ? parts[1] : undefined,
        value: value,
        display: (parts[1] + " " + (parts[2] || "")).trim()
    }
}

// buildMemory([
//     "01 LDA 4",
//     "02 HLT",
//     "99 1"
// ])

module.exports = {
    parseLine,
    buildMemory
}