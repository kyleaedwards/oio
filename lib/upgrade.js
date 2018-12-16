/**
 * Imports
 */
const { exec } = require('child_process');

exec('git pull', (err, stdout, stderr) => {
  if (err || stderr) {
    console.error(err || stderr);
    return;
  }
  console.log(stdout);
});