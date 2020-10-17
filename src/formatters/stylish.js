const format = (diffTree) => {

  const formatted = diffTree.map(({name, type, oldValue, newValue, children}) => {
    if (type === 'unchanged') {
      return `    ${name}: ${oldValue}`;
    }

    if (type === 'changed') {
      return `    ${name}: ${oldValue}`;
    }

    if (type === 'added') {
      return `  + ${name}: ${newValue}`;
    }

    if (type === 'deleted') {
      return `  - ${name}: ${oldValue}`;
    }

    if (type === 'nested') {
      return `    ${name}: nested`;
    }

    throw new Error('Unknown node type');
  });

  return `{\n${formatted.join('\n')}\n}`;
};

export default format;
