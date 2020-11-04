import _ from 'lodash';

const makeIndent = (level) => '    '.repeat(level);

const stringify = (value, depthLevel) => {
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
  const iter = (nodes, depthLevel = 0) => _.flatMapDeep(nodes, ({
    name,
    type,
    oldValue,
    newValue,
    children,
  }) => {
    const indent = makeIndent(depthLevel);
    switch (type) {
      case 'deleted':
        return `${indent}  - ${name}: ${stringify(oldValue, depthLevel + 1)}`;
      case 'added':
        return `${indent}  + ${name}: ${stringify(newValue, depthLevel + 1)}`;
      case 'unchanged':
        return `${indent}    ${name}: ${stringify(oldValue, depthLevel + 1)}`;
      case 'changed':
        return [
          `${indent}  - ${name}: ${stringify(oldValue, depthLevel + 1)}`,
          `${indent}  + ${name}: ${stringify(newValue, depthLevel + 1)}`,
        ];
      case 'nested':
        return [
          `${indent}    ${name}: {`,
          iter(children, depthLevel + 1),
          `${makeIndent(depthLevel + 1)}}`];
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  });

  const lines = iter(diffTree);

  return `{\n${lines.join('\n')}\n}`;
};

export default format;
