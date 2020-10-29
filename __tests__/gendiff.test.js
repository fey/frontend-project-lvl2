import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('test gendiff', () => {
  test('default formatter with json', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expectedPath = getFixturePath('stylish.txt');

    const expected = fs.readFileSync(expectedPath, 'utf-8').trim();

    expect(gendiff(filepath1, filepath2)).toEqual(expected);
  });

  const dataTable = [
    ['stylish', 'yml'],
    ['stylish', 'json'],
    ['plain', 'yml'],
    ['plain', 'json'],
    ['json', 'yml'],
    ['json', 'json'],
  ];

  test.each(dataTable)('%s format with %s files', (formatter, fileFormat) => {
    const filepath1 = getFixturePath(`file1.${fileFormat}`);
    const filepath2 = getFixturePath(`file2.${fileFormat}`);
    const expectedPath = getFixturePath(`${formatter}.txt`);

    const expected = fs.readFileSync(expectedPath, 'utf-8').trim();

    expect(gendiff(filepath1, filepath2, formatter)).toEqual(expected);
  });
});
