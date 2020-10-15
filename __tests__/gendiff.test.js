import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import gendiff from '../src/index.js';

const fixtureDir = '__fixtures__';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.each([
  ['yml'],
  ['json'],
  ['ini']
])('gendiff with %s', (fileFormat) => {
  const filepath1 = path.resolve(__dirname, fixtureDir, `file1.${fileFormat}`);
  const filepath2 = path.resolve(__dirname, fixtureDir, `file2.${fileFormat}`);
  const expectedPath = path.join(__dirname, fixtureDir, 'stylish.txt');

  const expected = fs.readFileSync(expectedPath, 'utf-8');

  expect(gendiff(filepath1, filepath2)).toEqual(expected.trim());
});
