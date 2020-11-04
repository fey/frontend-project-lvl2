import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

const format = (diffTree) => {
  const iter = (nodes, ancestors = []) => _.compact(_.flatMap(nodes, ({
    name,
    type,
    oldValue,
    newValue,
    children,
  }) => {
    const ascentryPath = [...ancestors, name].join('.');

    switch (type) {
      case 'changed':
        return `Property '${ascentryPath}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
      case 'added':
        return `Property '${ascentryPath}' was added with value: ${stringify(newValue)}`;
      case 'deleted':
        return `Property '${ascentryPath}' was removed`;
      case 'nested':
        return iter(children, [...ancestors, name]);
      case 'unchanged':
        return '';
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  }));

  const lines = iter(diffTree);

  return lines.join('\n');
};

export default format;
