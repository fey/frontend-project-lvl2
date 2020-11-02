import YAML from 'yaml';

const parseJson = (data) => JSON.parse(data);
const parseYaml = (data) => YAML.parse(data);

const parse = (data, type) => {
  switch (type) {
    case 'json':
      return parseJson(data);
    case 'yml':
    case 'yaml':
      return parseYaml(data);
    default:
      throw new Error(`Unknown data type: ${type}`);
  }
};

export default parse;
