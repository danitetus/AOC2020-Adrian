import fs from 'fs';
import path from 'path';

function ValidPaswordCount(data: Data[]): number {

    let validCount = 0;
    for (let x of data) {
        let count = 0;
        if (x.word.charAt(x.num1 - 1) == x.letter && x.word.charAt(x.num2 - 1) != x.letter) {
            validCount++;
        } else if (x.word.charAt(x.num1 - 1) != x.letter && x.word.charAt(x.num2 - 1) == x.letter) {
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
            num1: parseInt(lineSplited[0].split('-')[0], 10),
            num2: parseInt(lineSplited[0].split('-')[1], 10),
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
    num1: number,
    num2: number,
    letter: string,
    word: string,
}