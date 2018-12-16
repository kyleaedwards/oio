exports.description = 'Retrieves a setting from the configuration file by key';

exports.example = 'oio config get {key}';

exports.requiredArgs = 1;

exports.fn = function get({ config }, input) {
  const [key] = input.args;
  if (config[key] !== undefined) {
    process.stdout.write(`${key}: ${config[key]}\n`);
  } else {
    process.stdout.write(`Configuration for '${key}' not found\n`);
  }
};
