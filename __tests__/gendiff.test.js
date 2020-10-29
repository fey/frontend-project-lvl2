import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import gendiff from '../src/gendiff.js';

const fixtureDir = path.join('..', '__fixtures__');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('test gendiff', () => {
  test('default formatter with json', () => {
    const filepath1 = path.resolve(__dirname, fixtureDir, 'file1.json');
    const filepath2 = path.resolve(__dirname, fixtureDir, 'file2.json');
    const expectedPath = path.join(__dirname, fixtureDir, 'stylish.txt');

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
    const filepath1 = path.resolve(__dirname, fixtureDir, `file1.${fileFormat}`);
    const filepath2 = path.resolve(__dirname, fixtureDir, `file2.${fileFormat}`);
    const expectedPath = path.join(__dirname, fixtureDir, `${formatter}.txt`);

    const expected = fs.readFileSync(expectedPath, 'utf-8').trim();

    expect(gendiff(filepath1, filepath2, formatter)).toEqual(expected);
  });
});
