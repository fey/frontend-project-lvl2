import _ from 'lodash';

const makeIndent = (level) => '    '.repeat(level);

const stringify = (value, depthLevel) => {
  if (_.isArray(value)) {
    return `[ ${value.join(', ')} ]`;
  }

  if (!_.isPlainObject(value)) {
    return value;
  }

  const indent = makeIndent(depthLevel + 1);
  const indentCloseBracket = makeIndent(depthLevel);
  const renderedObject = Object.keys(value)
    .map((key) => `${indent}${key}: ${stringify(value[key], depthLevel + 1)}`)
    .join('\n');

  return `{\n${renderedObject}\n${indentCloseBracket}}`;
};

const format = (diffTree) => {
  const iter = (nodes, depthLevel = 0) => {
    const lines = nodes.map(({
      name,
      type,
      oldValue,
      newValue,
      children,
    }) => {
      const indent = makeIndent(depthLevel);
      const mapping = {
        unchanged: () => `${indent}    ${name}: ${stringify(oldValue, depthLevel + 1)}`,
        changed: () => [
          `${indent}  - ${name}: ${stringify(oldValue, depthLevel + 1)}`,
          `${indent}  + ${name}: ${stringify(newValue, depthLevel + 1)}`,
        ].join('\n'),
        added: () => `${indent}  + ${name}: ${stringify(newValue, depthLevel + 1)}`,
        deleted: () => `${indent}  - ${name}: ${stringify(oldValue, depthLevel + 1)}`,
        nested: () => {
          const indentCloseBracket = makeIndent(depthLevel + 1);
          return [
            `${indent}    ${name}: {`,
            iter(children, depthLevel + 1),
            `${indentCloseBracket}}`];
        },
      };

      if (!_.has(mapping, type)) {
        throw new Error('Unknown node type');
      }

      return mapping[type]();
    });

    return _.flattenDeep(lines);
  };

  const lines = iter(diffTree);

  return `{\n${lines.join('\n')}\n}`;
};

export default format;
