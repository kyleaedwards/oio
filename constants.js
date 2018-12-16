'use strict';

/**
 * Imports
 */
const path = require('path');
const os = require('os');

exports.HELP_FLAGS = ['-h', '--help'];

exports.HELPTEXT_PREFIX = [
  '',
  'λ Transient [oio]',
  '(https://kedw.io/projects/oio)',
  ''
].join('\n');

exports.DISCIPLINES = [
  'hardware', // 0
  'software', // 1
  'research', // 2
  'creative', // 3
];

exports.BASE_DIR = path.resolve(os.homedir(), '.oio');
exports.CONFIG_FILE = path.join(exports.BASE_DIR, 'config.json');
exports.PROJECTS_FILE = path.join(exports.BASE_DIR, 'projects.json');
exports.TIME_FILE = path.join(exports.BASE_DIR, 'data.json');
