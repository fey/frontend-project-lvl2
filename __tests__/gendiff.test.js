import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import gendiff from '../src/index.js';

test('gendiff', () => {
  const fixtureDir = '__fixtures__';
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filepath1 = path.resolve(__dirname, fixtureDir, 'file1.json');
  const filepath2 = path.resolve(__dirname, fixtureDir, 'file2.json');
  const expectedPath = path.join(__dirname, fixtureDir, 'stylish.txt');

  const expected = fs.readFileSync(expectedPath, 'utf-8');

  expect(gendiff(filepath1, filepath2)).toEqual(expected.trim());
});
