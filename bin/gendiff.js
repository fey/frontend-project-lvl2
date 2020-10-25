#!/usr/bin/env node
import commander from 'commander';
import gendiff from '../src';

commander.program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format');

commander.program.parse();

const [filepath1, filepath2, type] = commander.program.args;

console.log(gendiff(filepath1, filepath2, type));
