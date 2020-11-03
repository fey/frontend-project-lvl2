import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const read = (filePath) => fs.readFileSync(filePath, 'utf-8').trim();
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const formats = [
  'yml',
  'json',
];
const formaterCases = [
  ['stylish', 'stylish'],
  ['plain', 'plain'],
  ['json', 'json'],
  [undefined, 'stylish'],
];

describe.each(formaterCases)('test with %s formatter, expected %s output', (formatter, expectedFileName) => {
  // eslint-disable-next-line
  let expectedOutput;

  beforeEach(() => {
    const expectedPath = getFixturePath(`${expectedFileName}.txt`);
    // eslint-disable-next-line
    expectedOutput = read(expectedPath);
  });

  test.each(formats)('%s', (fileFormat) => {
    const filepath1 = getFixturePath(`file1.${fileFormat}`);
    const filepath2 = getFixturePath(`file2.${fileFormat}`);

    expect(gendiff(filepath1, filepath2, formatter)).toEqual(expectedOutput);
  });
});
