#!/usr/bin/env node
import commander from 'commander';
import gendiff from '../src/index.js';

commander.program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format');

commander.program.parse();

const [filepath1, filepath2] = commander.program.args;
const { format } = commander.program;

console.log(gendiff(filepath1, filepath2, format));
