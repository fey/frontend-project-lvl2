#!/usr/bin/env node
import commander from '../node_modules/commander/index.js';

commander.program.description('Compares two configuration files and shows a difference.');
commander.program.version('1.0.0');

commander.program.parse(process.argv);
