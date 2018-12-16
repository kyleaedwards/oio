'use strict';

/**
 * Imports
 */
const fs = require('fs');
const finishLastEvent = require('../utils/finish-last-event');
const { DISCIPLINES, TIME_FILE } = require('../constants');
const slugify = require('../utils/slugify');
const addProject = require('../utils/add-project');

exports.description = 'Begins a time-tracking event';

exports.example = 'oio start {project} {discipline}';

exports.requiredArgs = 2;

exports.fn = function start(ctx, input) {
  const [projectName, discipline] = input.args;
  const dId = DISCIPLINES.indexOf(discipline);
  const slug = slugify(projectName);
  if (dId === -1) {
    process.stdout.write(`Invalid discipline: ${discipline}\n`);
    process.exit(1);
    return;
  }
  addProject(ctx, slug, (project) => {
    finishLastEvent((err) => {
      if (err) {
        process.stdout.write(`Error handling previous event\n`);
        process.exit(1);
      }
      fs.appendFile(TIME_FILE, `\n${project.id}|${dId}|${Date.now()}`, (err) => {
        if (err) {
          process.stdout.write(`Error logging new event\n`);
          process.exit(1);
        }
        process.stdout.write(`Logging started...\nProject: ${projectName}\nDiscipline: ${discipline}\n`);
      });
    });
  });
};
