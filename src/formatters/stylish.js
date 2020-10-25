import _ from 'lodash';

const makeIndent = (level) => '    '.repeat(level);

const format = (diffTree) => {
  const stringify = (value, depthLevel) => {
    if (_.isArray(value)) {
      return `[ ${value.join(', ')} ]`;
    }

    if (!_.isPlainObject(value)) {
      return value;
    }

    const indent = makeIndent(depthLevel + 1);
    const indentCloseBracket = makeIndent(depthLevel);
    const formatted = Object.keys(value)
      .map((key) => `${indent}${key}: ${stringify(value[key], depthLevel + 1)}`)
      .join('\n');

    return `{\n${formatted}\n${indentCloseBracket}}`;
  };

  const iter = (nodes, depthLevel = 0) => {
    const formatted = nodes.map(({
      name,
      type,
      oldValue,
      newValue,
      children,
    }) => {
      const indent = makeIndent(depthLevel);

      if (type === 'unchanged') {
        return `${indent}    ${name}: ${stringify(oldValue, depthLevel + 1)}`;
      }

      if (type === 'changed') {
        return [
          `${indent}  - ${name}: ${stringify(oldValue, depthLevel + 1)}`,
          `${indent}  + ${name}: ${stringify(newValue, depthLevel + 1)}`,
        ].join('\n');
      }

      if (type === 'added') {
        return `${indent}  + ${name}: ${stringify(newValue, depthLevel + 1)}`;
      }

      if (type === 'deleted') {
        return `${indent}  - ${name}: ${stringify(oldValue, depthLevel + 1)}`;
      }

      if (type === 'nested') {
        const indentCloseBracket = makeIndent(depthLevel + 1);
        return [
          `${indent}    ${name}: {`,
          iter(children, depthLevel + 1).join('\n'),
          `${indentCloseBracket}}`,
        ].join('\n');
      }

      throw new Error('Unknown node type');
    });

    return _.flattenDeep(formatted);
  };

  const formatted = iter(diffTree);

  return `{\n${formatted.join('\n')}\n}`;
};

export default format;
