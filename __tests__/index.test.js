import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import gendiff from '../src/index.js';

const fixtureDir = '../__fixtures__';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('test gendiff', () => {
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
