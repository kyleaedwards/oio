/**
 * Imports
 */
const path = require('path');
const os = require('os');
const chalk = require('chalk');

const TITLE = 'oio :: Transient Time Tracking';

exports.HELP_FLAGS = ['-h', '--help'];

exports.TITLE = TITLE;

exports.HELPTEXT_PREFIX = [
  '',
  TITLE,
  '(https://kedw.io/projects/oio)',
  ''
].join('\n');

exports.DISCIPLINES = [
  'hardware', // 0
  'software', // 1
  'research', // 2
  'creative', // 3
];

exports.DISCIPLINE_COLORS = {
  hardware: '#6AE',
  software: '#6C8',
  research: '#ED6',
  creative: '#E6A',
};

const LEGEND = [
  chalk.bold('Legend:'),
];
exports.DISCIPLINES.forEach((key) => {
  const color = exports.DISCIPLINE_COLORS[key];
  LEGEND.push(`${chalk.bgHex(color)('   ')} ${chalk.hex(color)(key)}`);
});
exports.LEGEND = LEGEND.join('\n');

exports.BASE_DIR = path.resolve(os.homedir(), '.oio');
exports.CONFIG_FILE = path.join(exports.BASE_DIR, 'config.json');
exports.PROJECTS_FILE = path.join(exports.BASE_DIR, 'projects.json');
exports.TIME_FILE = path.join(exports.BASE_DIR, 'data.json');
