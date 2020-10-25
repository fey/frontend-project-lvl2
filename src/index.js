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

    const mapping = [
      {
        condition: _.has(dataset1, key)
          && _.has(dataset2, key)
          && _.isPlainObject(oldValue)
          && _.isPlainObject(newValue),
        buildNode: () => ({
          name: key, type: 'nested', children: buildDiff(oldValue, newValue),
        }),
      },
      {
        condition: _.has(dataset1, key) && _.has(dataset2, key) && _.isEqual(oldValue, newValue),
        buildNode: () => ({
          name: key, type: 'unchanged', oldValue,
        }),
      },
      {
        condition: (_.has(dataset1, key) && _.has(dataset2, key) && !_.isEqual(oldValue, newValue)),
        buildNode: () => ({
          name: key, type: 'changed', oldValue, newValue,
        }),
      },
      {
        condition: _.has(dataset1, key) && !_.has(dataset2, key),
        buildNode: () => ({
          name: key, type: 'deleted', oldValue,
        }),
      },
      {
        condition: !_.has(dataset1, key) && _.has(dataset2, key),
        buildNode: () => ({
          name: key, type: 'added', newValue,
        }),
      },
    ];

    const { buildNode } = mapping.find(({ condition }) => condition);

    if (buildNode === undefined) {
      throw new Error('Unknown node type');
    }

    return buildNode();
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
