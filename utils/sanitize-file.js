'use strict';

/**
 * Imports
 */
const fs = require('fs');
const { TIME_FILE } = require('../constants');

module.exports = (cb) => {
  fs.readFile(TIME_FILE, 'utf8', (err, content) => {
    if (err) {
      cb(err);
      return;
    }
    const sanitized = content.split('\n').filter(l => l !== '').join('\n');
    fs.writeFile(TIME_FILE, sanitized, cb);
  });
}