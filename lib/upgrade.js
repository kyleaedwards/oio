/**
 * Imports
 */
const { exec } = require('child_process');

exports.description = 'Upgrades to the latest version';

exports.example = 'oio upgrade';

exports.requiredArgs = 0;

exports.fn = () => {
  exec('git pull', (err, stdout, stderr) => {
    if (err || stderr) {
      console.error(err || stderr);
      return;
    }
    console.log(stdout);
  });
};
