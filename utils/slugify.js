/**
 * Sanitizes a string into a slug form.
 *
 * @param   {String}  str     Arbitrary text string
 * @returns {String}          Slug
 */
module.exports = str =>
  str.toLowerCase()
    .replace(/^[-\\\/_ ]+|[-\\\/_ ]+$/gi,'')
    .replace(/[\\\/_]/gi, '-')
    .replace(/ /gi, '-')
    .replace(/-+/gi,'-');
