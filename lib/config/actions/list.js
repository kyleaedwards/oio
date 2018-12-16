'use strict';

exports.description = 'Lists all settings from the configuration file';

exports.example = 'oio config list';

exports.requiredArgs = 0;

exports.fn = function get({ config }, input) {
  Object.keys(config).forEach((key) => {
    process.stdout.write(`${key}: ${config[key]}\n`);
  });
};
