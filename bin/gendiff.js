#!/usr/bin/env node
import commander from '../node_modules/commander/index.js';

commander.program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format');

commander.program.parse(process.argv);
