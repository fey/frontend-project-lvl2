import YAML from 'yaml';
import ini from 'ini';

const parseJson = (data) => JSON.parse(data);
const parseYaml = (data) => YAML.parse(data);
const parseIni = (data) => ini.parse(data);

const parse = (data, parser = 'json') => {
  switch (parser) {
    case 'json':
      return parseJson(data);
    case 'ini':
      return parseIni(data);
    case 'yml':
    case 'yaml':
      return parseYaml(data);
    default:
      throw new Error('Unknown parser type');
  }
};

export default parse;
