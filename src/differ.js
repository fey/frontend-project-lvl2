import _ from 'lodash';

const buildDiff = (dataset1, dataset2) => {
  const keys = _.sortBy(_.union(_.keys(dataset1), _.keys(dataset2)));

  const diff = keys.map((name) => {
    const oldValue = _.get(dataset1, name);
    const newValue = _.get(dataset2, name);

    if (_.has(dataset1, name) && !_.has(dataset2, name)) {
      return { name, type: 'deleted', oldValue };
    }

    if (!_.has(dataset1, name) && _.has(dataset2, name)) {
      return { name, type: 'added', newValue };
    }

    if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      return { name, type: 'nested', children: buildDiff(oldValue, newValue) };
    }

    if (!_.isEqual(oldValue, newValue)) {
      return {
        name, type: 'changed', oldValue, newValue,
      };
    }

    return { name, type: 'unchanged', oldValue };
  });

  return diff;
};

export default buildDiff;
