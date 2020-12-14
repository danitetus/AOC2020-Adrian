import fs from 'fs';
import path from 'path';


const emptyPassport: Ipasport = {
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
    let pasport: Ipasport = { ...emptyPassport };
    for (let line of array) {
        if (line === '') {
            const pasportDetach = { ...pasport };
            dataArranged.push(pasportDetach);
            pasport = { ...emptyPassport };
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

    for (let passport of array) {
        let validationCount = 0;
        const Byear = parseInt(passport.byr);
        if (Byear >= 1920 && Byear <= 2002) {
            validationCount++;
        }
        const Iyear = parseInt(passport.iyr);
        if (Iyear >= 2010 && Iyear <= 2020) {
            validationCount++;
        }
        const Eyear = parseInt(passport.eyr);
        if (Eyear >= 2020 && Eyear <= 2030) {
            validationCount++;
        }

        const heightValue = parseInt(passport.hgt)
        if (heightValue >= 150 && heightValue <= 192) {
            if (passport.hgt.slice(3) === 'cm') {
                validationCount++;
            }
        }
        if (heightValue >= 59 && heightValue <= 76) {
            if (passport.hgt.slice(2) === 'in') {
                validationCount++;
            }
        }
        let matchColor = /^#[\da-f]{6}$/;
        let matchHairColor = matchColor.exec(passport.hcl);
        if (matchHairColor) {
            if (matchHairColor[0] == matchHairColor.input) {
                validationCount++;
            }
        }
        let eyematch = /^(amb|blu|brn|gry|grn|hzl|oth)$/;
        let matchEyeColor = eyematch.exec(passport.ecl);
        if (matchEyeColor) {
            if (matchEyeColor[0] == matchEyeColor.input) {
                validationCount++;
            }
        }
        let matchId = /[0-9]{9}/;
        let matchPassportId = matchId.exec(passport.pid);
        if (matchPassportId) {
            if (matchPassportId[0] == matchPassportId.input) {
                validationCount++;
            }
        }
        if (validationCount == 7) {
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