import fs from 'fs';
import path from 'path';


function FindTrees(data: string[]): number {
    let treesFound = 0;
    let column = 0;
    let line = 0;
    while (line < data.length) {
        if (data[line].charAt(column) == '#') {
            treesFound++;
        } else {
            data[line].charAt(column).replace('.', '0');
        }
        line++;
        column += 3;
        if (column >= data[0].length) {
            column -= data[0].length;
        }
    }
    return treesFound;
}
const start = async (): Promise<number> => {
    const inputData = await fs.promises.readFile(path.join(__dirname, 'input.txt'));
    const data = inputData.toString().split('\n').map(x => {
        return x.replace('\r', '');
    });
    console.log(data);
    const result = FindTrees(data);
    console.log(result);
    return result;
}

start();