import YAML from 'yaml';

const parseJson = (data) => JSON.parse(data);
const parseYaml = (data) => YAML.parse(data);

const parse = (data, parser) => {
  switch (parser) {
    case 'json':
      return parseJson(data);
    case 'yml':
    case 'yaml':
      return parseYaml(data);
    default:
      throw new Error('Unknown parser type');
  }
};

export default parse;
