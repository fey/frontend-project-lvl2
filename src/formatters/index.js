import _ from 'lodash';
import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const format = (diff, formatter = 'stylish') => {
  const mapping = {
    stylish: () => formatStylish(diff),
    plain: () => formatPlain(diff),
    json: () => formatJson(diff),
  };

  if (!_.has(mapping, formatter)) {
    throw new Error(`Unknown formatter type: ${formatter}`);
  }

  return mapping[formatter]();
};

export default format;
