'use strict';

/**
 * Constants
 */
const PADDING = 4;

/**
 * Creates an array of helptext for a list of items and their descriptions.
 *
 * @param {Object} obj        Entity or action set
 * @param {Number} [maxLen]   Maximum characters of keys
 */
module.exports = (obj, maxLen) => {
  const keys = Object.keys(obj).sort();
  let padding = maxLen + PADDING;
  if (!maxLen) {
    padding = keys.reduce((prev, curr) => Math.max(prev, curr.length), 0) + PADDING;
  }
  return keys.map(key => `  ${key}${' '.repeat(padding - key.length)}${obj[key].description || ''}`);
};
