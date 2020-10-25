import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  if (_.isBoolean(value) || _.isNull(value)) {
    return value;
  }

  return `'${value}'`;
};

const format = (diffTree) => {
  const iter = (nodes, ancestors = []) => {
    const formatted = nodes.map(({
      name,
      type,
      oldValue,
      newValue,
      children,
    }) => {
      const ascentryPath = [...ancestors, name].join('.');
      if (type === 'changed') {
        return `Property '${ascentryPath}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
      }

      if (type === 'added') {
        return `Property '${ascentryPath}' was added with value: ${stringify(newValue)}`;
      }

      if (type === 'deleted') {
        return `Property '${ascentryPath}' was removed`;
      }

      if (type === 'nested') {
        return iter(children, [...ancestors, name]);
      }

      return '';
    });

    return _.flattenDeep(formatted.filter(_.identity));
  };

  const lines = iter(diffTree);

  return lines.join('\n');
};

export default format;
