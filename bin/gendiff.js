#!/usr/bin/env node
import commander from 'commander';
import gendiff from '../src/gendiff.js';

const { program } = commander;

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, { format }) => {
    console.log(gendiff(filepath1, filepath2, format));
  })
  .parse(process.argv);
