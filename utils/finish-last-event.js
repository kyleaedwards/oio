/**
 * Imports
 */
const fs = require('fs');
const sanitizeFile = require('./sanitize-file');
const { TIME_FILE } = require('../constants');

/**
 * Constants
 */
const LB = '\n';

function finishLastEvent(cb) {
  const readable = fs.createReadStream(TIME_FILE, 'utf8');
  let prevLine = '';
  let line = '';
  let newLine = false;
  readable.on('data', (chunk) => {
    if (newLine) {
      prevLine = line;
      line = '';
    }
    const lineParts = chunk.split(LB);
    let len = lineParts.length;
    newLine = lineParts[len - 1] === '';
    if (!len) {
      return;
    }
    if (len === 1) {
      line += lineParts[0];
      return;
    }
    prevLine = lineParts[len - 2] || '';
    line = lineParts[len - 1] || '';
  });
  readable.on('end', () => {
    if (line === '' && prevLine === '') {
      cb(null, false);
      return;
    }
    if (line === '' && prevLine !== '') {
      sanitizeFile((sanitizeErr) => {
        if (sanitizeErr) {
          cb(sanitizeErr, false);
          return;
        }
        finishLastEvent(cb);
      });
      return;
    }
    const lastLine = line.split('|');
    const [id, discipline] = lastLine;
    let start = parseInt(lastLine[2], 10);
    let end = lastLine[3];
    if (end) {
      cb(null, false);
      return;
    }
    end = Date.now();
    let duration = end - start;
    fs.appendFile(TIME_FILE, `|${end}|${duration}`, (err) => {
      cb(err, { id, discipline, duration });
    });
  });
}

module.exports = finishLastEvent;
