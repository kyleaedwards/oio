/**
 * Imports
 */
const fs = require('fs');
const { CONFIG_FILE } = require('../../../constants');

exports.description = 'Deletes a setting the configuration file';

exports.example = 'oio config delete {key}';

exports.requiredArgs = 1;

exports.fn = function del({ config }, input) {
  const [key] = input.args;
  const newConfig = JSON.stringify(Object.assign({}, config, { [key]: undefined }));
  fs.writeFile(CONFIG_FILE, newConfig, (err) => {
    if (err) {
      process.stdout.write('Could not update config\n');
      return;
    }
    process.stdout.write('Config updated!\n');
  });
};
