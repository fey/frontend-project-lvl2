import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const format = (diff, type = 'stylish') => {
  switch (type) {
    case 'stylish':
      return formatStylish(diff);
    case 'plain':
      return formatPlain(diff);
    case 'json':
      return formatJson(diff);
    default:
      throw new Error('Unknown formatter type');
  }
};

export default format;
