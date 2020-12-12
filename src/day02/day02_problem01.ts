import fs from 'fs';
import path from 'path';

function ValidPaswordCount(data: Data[]): number {

    let validCount = 0;
    for (let x of data) {
        let count = 0;
        for (let letter of x.word) {
            if (letter == x.letter) {
                count++;
            }
        }
        if (count >= x.num_min && count <= x.num_max) {
            validCount++;
        }
    }
    return validCount;
}

const start = async (): Promise<number> => {
    const inputData = await fs.promises.readFile(path.join(__dirname, 'input.txt'));
    const data = inputData.toString().split('\n').map((line: string) => {
        return line.trim();
    });

    let structuredData: Data[] = [];
    let index = 0;
    for (let line of data) {

        let lineSplited = line.split(' ');
        const x: Data = {
            num_min: parseInt(lineSplited[0].split('-')[0], 10),
            num_max: parseInt(lineSplited[0].split('-')[1], 10),
            letter: lineSplited[1].charAt(0),
            word: lineSplited[2]
        }
        structuredData.push(x);
    }
    console.log(structuredData);
    const result = ValidPaswordCount(structuredData);
    console.log(result);
    return result;
}

start();

interface Data {
    num_min: number,
    num_max: number,
    letter: string,
    word: string,
}