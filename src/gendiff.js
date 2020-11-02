import fs from 'fs';
import path from 'path';
import parse from './parsers/index.js';
import format from './formatters/index.js';
import buildDiff from './differ.js';

const getFileData = (filePath) => {
  const type = path.extname(filePath).substr(1);
  const content = fs.readFileSync(filePath, 'utf8');

  return { content, type };
};

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const fileData1 = getFileData(filepath1);
  const fileData2 = getFileData(filepath2);

  const data1 = parse(fileData1.content, fileData1.type);
  const data2 = parse(fileData2.content, fileData2.type);

  const diff = buildDiff(data1, data2);

  return format(diff, formatter);
};

export default genDiff;
