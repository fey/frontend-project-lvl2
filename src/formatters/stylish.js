import _ from 'lodash';

const format = (diffTree) => {
  const formatValue = (value) => {
    // if (_.isPlainObject(value)) {
    //   console.log(value);
    //   return (value);
    // }

    if (_.isArray(value)) {
      return `[ ${value.map(formatValue).join(', ')} ]`;
    }

    console.log(value);
    return value.toString();
  };

  const formatted = diffTree.map(({name, type, oldValue, newValue, children}) => {
    if (type === 'unchanged') {
      return `    ${name}: ${formatValue(oldValue)}`;
    }

    if (type === 'changed') {
      return `    ${name}: ${formatValue(oldValue)}`;
    }

    if (type === 'added') {
      return `  + ${name}: ${formatValue(newValue)}`;
    }

    if (type === 'deleted') {
      return `  - ${name}: ${formatValue(oldValue)}`;
    }

    if (type === 'nested') {
      return `    ${name}: ${format(children)}`;
    }

    throw new Error('Unknown node type');
  });

  return `{\n${formatted.join('\n')}\n}`;
};

export default format;
