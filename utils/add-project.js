'use strict';

/**
 * Imports
 */
const fs = require('fs');
const { PROJECTS_FILE } = require('../constants');

/**
 * Figures
 *
 * @param {Function}  cb    Callback function
 */
module.exports = (ctx, slug, cb) => {
  if (ctx.projects[slug]) {
    cb(ctx.projects[slug]);
    return;
  }
  const project = {
    id: ctx.projectMeta.maxId + 1,
    slug,
  };
  ctx.projects[slug] = project;
  fs.writeFile(PROJECTS_FILE, JSON.stringify(ctx.projects), (writeErr) => {
    if (writeErr) {
      process.stdout.write('Could not create a new project\n');
      process.exit(1);
      return;
    }
    cb(project);
  });
};