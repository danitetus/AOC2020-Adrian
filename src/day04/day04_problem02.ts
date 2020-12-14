import fs from 'fs';
import path from 'path';


const empyPasport: Ipasport = {
    byr: '',
    iyr: '',
    eyr: '',
    hgt: '',
    hcl: '',
    ecl: '',
    pid: '',
    cid: ''
}

function PasportArrange(array: string[]): Ipasport[] {
    let dataArranged: Ipasport[] = [];
    let pasport: Ipasport = empyPasport;
    for (let line of array) {
        if (line === '') {
            dataArranged.push(pasport);
            pasport = empyPasport;
        } else {
            const lineSplit = line.split(':');
            switch (lineSplit[0]) {
                case 'byr':
                    pasport.byr = lineSplit[1];
                    break;
                case 'iyr':
                    pasport.iyr = lineSplit[1];
                    break;
                case 'eyr':
                    pasport.eyr = lineSplit[1];
                    break;
                case 'hgt':
                    pasport.hgt = lineSplit[1];
                    break;
                case 'hcl':
                    pasport.hcl = lineSplit[1];
                    break;
                case 'ecl':
                    pasport.ecl = lineSplit[1];
                    break;
                case 'pid':
                    pasport.pid = lineSplit[1];
                    break;
                case 'cid':
                    pasport.cid = lineSplit[1];
                    break;
            }
        }
    }
    return dataArranged;
}

function countValidPasport(array: Ipasport[]): number {
    let result = 0;


    return result;
}
const start = async (): Promise<number> => {

    const inputData = await fs.promises.readFile(path.join(__dirname, 'input.txt'));
    let data = inputData.toString().split('\n').map(x => {
        return x.split(' ').map(y => y.replace('\r', ''));
    }).reduce((a, b) => a.concat(b));
    PasportArrange(data);
    return 0;
}

interface Ipasport {
    byr: string,
    iyr: string,
    eyr: string,
    hgt: string,
    hcl: string,
    ecl: string,
    pid: string,
    cid: string
}

start();