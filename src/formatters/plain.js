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
      const mapping = {
        changed: () => `Property '${ascentryPath}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`,
        added: () => `Property '${ascentryPath}' was added with value: ${stringify(newValue)}`,
        deleted: () => `Property '${ascentryPath}' was removed`,
        nested: () => iter(children, [...ancestors, name]),
      };

      if (!_.has(mapping, type)) {
        return null;
      }

      return mapping[type]();
    });

    return _(formatted).compact().flattenDeep().value();
  };

  const lines = iter(diffTree);

  return lines.join('\n');
};

export default format;
