import fs from 'fs';
import path from 'path';


function FindTrees(data: string[], slopes: NumberPar[]): number {
    let result = 1;
    for (let x of slopes) {
        let treesFound = 0;
        let column = 0;
        let line = 0;
        while (line < data.length) {
            if (data[line].charAt(column) == '#') {
                treesFound++;
            }
            line += x.num2;
            column += x.num1;
            if (column >= data[0].length) {
                column -= data[0].length;
            }
        }
        result *= treesFound;
    }

    return result;
}
const start = async (): Promise<number> => {
    const inputData = await fs.promises.readFile(path.join(__dirname, 'input.txt'));
    const data = inputData.toString().split('\n').map(x => {
        return x.replace('\r', '');
    });
    const slopes: NumberPar[] = [
        {
            num1: 1,
            num2: 1
        },
        {
            num1: 3,
            num2: 1
        },
        {
            num1: 5,
            num2: 1
        },
        {
            num1: 7,
            num2: 1
        },
        {
            num1: 1,
            num2: 2
        }
    ];
    const result = FindTrees(data, slopes);
    console.log(result);
    return result;
}
interface NumberPar {
    num1: number,
    num2: number
}
start();