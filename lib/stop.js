/**
 * Imports
 */
const finishLastEvent = require('../utils/finish-last-event');
const { DISCIPLINES } = require('../constants');
const humanizeTime = require('../utils/humanize-time');

exports.description = 'Stops the last time-tracking event';

exports.example = 'oio stop';

exports.requiredArgs = 0;

exports.fn = function stop(ctx, input) {
  finishLastEvent((err, project) => {
    if (err) {
      process.stdout.write(`Error handling previous event\n`);
      process.exit(1);
    }
    if (!project) {
      process.stdout.write(`No event to stop\n`);
      return;
    }
    const { id, discipline, duration } = project;
    process.stdout.write('Logging stopped...\n');
    process.stdout.write(`Project: ${ctx.projectMeta.byId[id].slug}\n`);
    process.stdout.write(`Discipline: ${DISCIPLINES[discipline]}\n`);
    process.stdout.write(`Duration: ${humanizeTime(duration)}\n`);
  });
};
