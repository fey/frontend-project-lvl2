import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers/index.js';
import format from './formatters/index.js';

const getFileData = (filePath) => {
  const ext = path.extname(filePath).substr(1);
  const content = fs.readFileSync(filePath, 'utf8');

  return { content, ext };
};

const buildDiff = (dataset1, dataset2) => {
  const keys = _.union(_.keys(dataset1), _.keys(dataset2)).sort();

  const diff = keys.map((key) => {
    const oldValue = _.get(dataset1, key);
    const newValue = _.get(dataset2, key);

    if (_.has(dataset1, key) && _.has(dataset2, key)
      && _.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      return { name: key, type: 'nested', children: buildDiff(oldValue, newValue) };
    }

    if (_.has(dataset1, key) && _.has(dataset2, key) && _.isEqual(oldValue, newValue)) {
      return { name: key, type: 'unchanged', oldValue };
    }

    if (_.has(dataset1, key) && _.has(dataset2, key)
      && !_.isEqual(oldValue, newValue)) {
      return {
        name: key, type: 'changed', oldValue, newValue,
      };
    }

    if (_.has(dataset1, key) && !_.has(dataset2, key)) {
      return { name: key, type: 'deleted', oldValue };
    }

    if (!_.has(dataset1, key) && _.has(dataset2, key)) {
      return { name: key, type: 'added', newValue };
    }

    throw new Error('Unknown node type');
  });

  return diff;
};

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const fileData1 = getFileData(filepath1);
  const fileData2 = getFileData(filepath2);

  const data1 = parse(fileData1.content, fileData1.ext);
  const data2 = parse(fileData2.content, fileData2.ext);

  const diff = buildDiff(data1, data2);

  return format(diff, formatter);
};

export default genDiff;
