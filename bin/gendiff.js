#!/usr/bin/env node
import commander from 'commander';
import gendiff from '../src/gendiff.js';

const { program } = commander;

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .parse();

const [filepath1, filepath2] = program.args;
const { format } = program;

const diff = gendiff(filepath1, filepath2, format);

console.log(diff);
