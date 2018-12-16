'use strict';

/**
 * Imports
 */
const fs = require('fs');
const { CONFIG_FILE } = require('../../../constants');

exports.description = 'Updates a setting in the configuration file';

exports.example = 'oio config set {key} {value}';

exports.requiredArgs = 2;

exports.fn = function set({ config }, input) {
  const [key, value] = input.args;
  const newConfig = JSON.stringify(Object.assign({}, config, { [key]: value }));
  fs.writeFile(CONFIG_FILE, newConfig, (err) => {
    if (err) {
      process.stdout.write('Could not update config\n');
      return;
    }
    process.stdout.write('Config updated!\n');
  });
};
