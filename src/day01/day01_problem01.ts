import fs from 'fs';
import path from 'path';

function FindSum(numbers: number[]): number {

    for (let num of numbers) {
        for (let num2 of numbers) {
            if (num + num2 == 2020 && num2 != num) {
                return (num * num2);
            }
        }
    }
    return 0;
}

const start = async (): Promise<number> => {
    const inputData = await fs.promises.readFile(path.join(__dirname, 'input.txt'));
    const numbers = inputData.toString().split('\n').map((line: string) => {
        return parseInt(line.trim(), 10);
    });
    const solucion = FindSum(numbers);
    console.log(solucion);
    return solucion;
}
start();