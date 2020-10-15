import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const getFileData = (filePath) => {
  const ext = path.extname(filePath).substr(1);
  const content = fs.readFileSync(filePath, 'utf8');

  return { content, ext };
};

const buildDiff = (dataset1, dataset2) => {
  const keys = _.union(_.keys(dataset1), _.keys(dataset2)).sort();

  const diff = keys.map((key) => {
    const value1 = _.get(dataset1, key);
    const value2 = _.get(dataset2, key);

    // if (_.has(dataset1, key) && _.has(dataset2, key)
    // && _.isPlainObject(value1) _.isPlainObject(value2)) {

    // }
    if (_.has(dataset1, key) && _.has(dataset2, key)
      && _.isEqual(value1, value2)) {
      return `    ${key}: ${value1}`;
    }
    if (_.has(dataset1, key) && _.has(dataset2, key)
      && !_.isEqual(value1, value2)) {
      return [`  - ${key}: ${value1}`, `  + ${key}: ${value2}`].join('\n');
    }
    if (_.has(dataset1, key) && _.has(dataset2, key)) {
      return `    ${key}: ${value1}`;
    }
    if (_.has(dataset1, key) && !_.has(dataset2, key)) {
      return `  - ${key}: ${value1}`;
    }
    if (!_.has(dataset1, key) && _.has(dataset2, key)) {
      return `  + ${key}: ${value2}`;
    }

    throw new Error('Unknown node type');
  })
    .join('\n');

  return `{\n${diff}\n}`;
};

export default (filepath1, filepath2) => {
  const fileData1 = getFileData(filepath1);
  const fileData2 = getFileData(filepath2);

  const data1 = parse(fileData1.content, fileData1.ext);
  const data2 = parse(fileData2.content, fileData2.ext);

  const diff = buildDiff(data1, data2);

  return diff;
};
