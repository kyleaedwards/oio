#!/usr/local/bin/node

'use strict';

/**
 * Imports
 */
const initialize = require('./utils/initialize');
const listDescriptions = require('./utils/list-descriptions');
const actions = require('./lib');
const { HELP_FLAGS, HELPTEXT_PREFIX } = require('./constants');

// Determine if help flag is present.
const help = !!process.argv.filter(function hasHelp(arg) {
  return HELP_FLAGS.indexOf(arg) > -1;
}).length;

// Get remaining arguments.
let args = process.argv.slice(2).filter(function noHelp(arg) {
  return HELP_FLAGS.indexOf(arg) === -1;
});

/**
 * Writes text and ends the process with a given code.
 *
 * @param {Array}  rows   Text to print to console
 * @param {Number} code   Process exit code
 */
const end = (rows, code) => {
  process.stdout.write(rows.join('\n') + '\n\n');
  process.exit(code || 0);
};

const actionName = args.shift();
let action = actions[actionName];

if (!action) {
  end([
    HELPTEXT_PREFIX,
    'Type `oio {action}` to see more information about each feature.',
    '',
    'Actions:'
  ].concat(listDescriptions(actions)));
}

if (actionName === 'config') {
  const configAction = args.shift();
  if (!configAction || !action.actions[configAction]) {
    end([
      HELPTEXT_PREFIX,
      `${action.description}`,
      '',
      `Type \`oio config {action}\` to see more information about each feature.`,
      '',
      'Actions:',
    ].concat(listDescriptions(action.actions)));
  }
  action = action.actions[configAction];
}

// Parse flags (--standalone-flag).
let flags = {};
if (action.flags) {
  flags = Object.keys(action.flags).reduce(function eachFlag(out, key) {
    out[key] = !!args.filter(function hasFlag(arg) {
      return action.flags[key].markers.indexOf(arg) > -1;
    }).length;
    args = args.filter(function noFlag(arg) {
      return action.flags[key].markers.indexOf(arg) === -1;
    });
    return out;
  }, {});
}

// Parse options (--key value).
let options = {};
if (action.options) {
  options = Object.keys(action.options).reduce(function eachOptions(out, key) {
    if (!out[key]) {
      out[key] = [];
    }
    action.options[key].markers.forEach(function eachOption(opt) {
      let index = args.indexOf(opt);
      while (index > -1) {
        out[key].push(args[index + 1]);
        args = args.slice(0, index).concat(args.slice(index + 2));
        index = args.indexOf(opt);
      }
    });
    return out;
  }, {});
}

// Display action helptext.
if (help || (action.requiredArgs && args.length < action.requiredArgs)) {
  let actionHelptext = [
    HELPTEXT_PREFIX,
    action.description,
    '',
    'Example:',
    `  ${action.example}`,
  ];
  let maxKeyLen = 0;
  if (action.flags) {
    maxKeyLen = Object.keys(action.flags).reduce((prev, curr) => Math.max(prev, curr.length), 0);
  }
  if (action.options) {
    maxKeyLen = Math.max(Object.keys(action.options).reduce((prev, curr) => Math.max(prev, curr.length), 0));
  }
  if (action.flags) {
    actionHelptext.push('');
    actionHelptext.push('Flags:');
    actionHelptext = actionHelptext.concat(listDescriptions(action.flags, maxKeyLen));
  }
  if (action.options) {
    actionHelptext.push('');
    actionHelptext.push('Options:');
    actionHelptext = actionHelptext.concat(listDescriptions(action.options, maxKeyLen));
  }
  end(actionHelptext);
}

// Delegate to action with parsed flags and options.
initialize((ctx) => {
  action.fn(ctx, {
    args: args,
    flags: flags,
    options: options
  });
});
