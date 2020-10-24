import _ from 'lodash';

const format = (diffTree) => {
  const iter = (nodes, depthLevel = 0) => {
    const formatted = nodes.map(({
      name,
      type,
      oldValue,
      newValue,
      children,
    }) => {
      const indent = '    '.repeat(depthLevel);

      if (type === 'unchanged') {
        return `${indent}    ${name}: ${(oldValue)}`;
      }

      if (type === 'changed') {
        return `${indent}  - ${name}: ${(oldValue)}`;
      }

      if (type === 'added') {
        return `${indent}  + ${name}: ${(newValue)}`;
      }

      if (type === 'deleted') {
        return `${indent}  - ${name}: ${(oldValue)}`;
      }

      if (type === 'nested') {
        return `${indent}    ${name}: ${iter(children, depthLevel + 1)}`;
      }

      throw new Error('Unknown node type');
    });

    return formatted;
  };

  const formatted = _.flattenDeep(iter(diffTree));

  return `{\n${formatted.join('\n')}\n}`;
};

export default format;
