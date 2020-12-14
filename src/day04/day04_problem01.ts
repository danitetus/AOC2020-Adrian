import fs from 'fs';
import path from 'path';
function PasportArrange(array: string[]): string[][] {
    let dataArranged = [];
    let pasport = '';
    for (let line of array) {
        if (line === '') {
            const pasportArrange = pasport.split(' ').sort();
            const a = pasportArrange.shift();
            dataArranged.push(pasportArrange);
            pasport = '';
        } else {
            const lineSplit = line.split(':');
            pasport += ` ${lineSplit[0]}`
        }
    }
    return dataArranged;
}

function countValidPasport(array: string[][]): number {
    let result = 0;

    for (let ar of array) {
        if (ar.includes('byr') && ar.includes('iyr') && ar.includes('eyr') && ar.includes('hgt') && ar.includes('hcl') && ar.includes('ecl') && ar.includes('pid')) {
            result++;
        }
    }

    return result;
}
const start = async (): Promise<number> => {

    const inputData = await fs.promises.readFile(path.join(__dirname, 'input.txt'));
    let data = inputData.toString().split('\n').map(x => {
        return x.split(' ').map(y => y.replace('\r', ''));
    }).reduce((a, b) => a.concat(b));

    console.log(countValidPasport(PasportArrange(data)));
    return 0;
}

start();
