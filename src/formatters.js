import formatStylish from './formatters/stylish.js';

/**
 *
 * @param {Object} diff
 * @param {string} type
 */
const format = (diff, type = 'stylish') => {
  switch (type) {
    case 'stylish':
      return formatStylish(diff);
    case 'plain': 
      return null;
      // return formatPlain(diff);
    case 'json':
      return null;
      // return formatJson(diff);
    default:
      throw new Error('Unknown formatter type');
  }
};

export default format;
