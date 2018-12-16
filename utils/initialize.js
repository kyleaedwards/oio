/**
 * Imports
 */
const fs = require('fs');
const { BASE_DIR, CONFIG_FILE, PROJECTS_FILE, TIME_FILE } = require('../constants');
const getProjectMeta = require('./get-project-meta');

/**
 * Constants
 */
const SETUP_ERR = 'Could not setup local configuration, please raise an issue at https://github.com/kyleaedwards/oio.\n';
const DEFAULT_CONFIG = {
  remote: false
};

/**
 * Check if a directory exists and creates it if it doesn't.
 *
 * @param {String}    dir   Path to directory 
 * @param {Function}  cb    Callback function
 */
const createDir = (dir, cb) => {
  fs.exists(dir, (exists) => {
    if (exists) {
      cb();
      return;
    }
    fs.mkdir(dir, (err) => {
      if (err) {
        process.stdout.write(SETUP_ERR);
        process.exit(1);
        return;
      }
      cb();
    });
  });
};

const createFile = (file, cb) => {
  fs.exists(file, (exists) => {
    if (exists) {
      cb();
      return;
    }
    fs.writeFile(file, '', (err) => {
      if (err) {
        process.stdout.write(SETUP_ERR);
        process.exit(1);
        return;
      }
      cb();
    });
  });
};

const createAndReadFile = (file, def, isJSON, cb) => {
  fs.readFile(file, 'utf8', (err, content) => {
    if (err && err.code !== 'ENOENT') {
      process.stdout.write(SETUP_ERR);
      process.exit(1);
      return;
    }
    let body = def;
    if (content) {
      if (isJSON) {
        try {
          body = JSON.parse(content);
          cb(body);
          return;
        } catch (e) {}
      } else if (content) {
        cb(content);
        return;
      }
    }
    fs.writeFile(file, isJSON ? JSON.stringify(body) : body, (writeErr) => {
      if (writeErr) {
        process.stdout.write(SETUP_ERR);
        process.exit(1);
        return;
      }
      cb(body);
    });
  });
};

/**
 * Initializes ~/.oio and ~/.oio/data directories and
 * retrieves or creates a configuration file.
 *
 * @param {Function}  cb    Callback function
 */
module.exports = (cb) => {
  createDir(BASE_DIR, () => {
    createFile(TIME_FILE, () => {
      createAndReadFile(PROJECTS_FILE, {}, true, (projects) => {
        const projectMeta = getProjectMeta(projects);
        createAndReadFile(CONFIG_FILE, DEFAULT_CONFIG, true, (config) => {
          cb({ projects, config, projectMeta });
        });
      });
    });
  });
};
