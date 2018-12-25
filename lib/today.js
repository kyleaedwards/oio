/**
 * Imports
 */
const fs = require('fs');
const { TITLE, DISCIPLINE_COLORS, LEGEND, TIME_FILE } = require('../constants');
const readLine = require('../utils/read-line');
const humanizeTime = require('../utils/humanize-time');
const chalk = require('chalk');

exports.description = 'Prints current day\'s progress';

exports.example = 'oio today';

exports.requiredArgs = 0;

exports.fn = function today(ctx, input) {
  const eachLine = readLine.bind(null, ctx);
  const dayStart = new Date();
  dayStart.setHours(0);
  dayStart.setMinutes(0);
  dayStart.setSeconds(0);
  dayStart.setMilliseconds(0);
  fs.readFile(TIME_FILE, 'utf8', (err, file) => {
    let totalTime = 0;
    const projects = {};
    const events = file.split('\n').map(eachLine).filter(n => n.start > dayStart.getTime());
    events.forEach((item) => {
      totalTime += item.duration;
      if (!projects[item.project.slug]) {
        projects[item.project.slug] = {
          total: 0,
          breakdown: {},
        };
      }
      projects[item.project.slug].total += item.duration;
      if (!projects[item.project.slug].breakdown[item.discipline]) {
        projects[item.project.slug].breakdown[item.discipline] = 0;
      }
      projects[item.project.slug].breakdown[item.discipline] += item.duration;
    });
    let maxProjectSlugLen = 0;
    let maxProjectTime = 0;
    Object.keys(projects).forEach((slug) => {
      maxProjectSlugLen = Math.max(maxProjectSlugLen, slug.length);
      maxProjectTime = Math.max(maxProjectTime, projects[slug].total);
    });

    const projectLines = Object.keys(projects).map(slug => {
      const { total, breakdown } = projects[slug];
      const bars = Math.round(25 * total / maxProjectTime);
      let ln = chalk.bold(slug);
      ln += ' '.repeat(maxProjectSlugLen - slug.length);
      ln += '  ';
      Object.keys(breakdown).forEach((key) => {
        const spaces = Math.round(bars * breakdown[key] / total);
        ln += chalk.bgHex(DISCIPLINE_COLORS[key])(' '.repeat(spaces));
      });
      ln += ' '.repeat(25 - bars);
      ln += '  ';
      ln += humanizeTime(total);
      return ln;
    });

    process.stdout.write([
      '',
      chalk.green(TITLE),
      '',
      `Total Time: ${chalk.bold(humanizeTime(totalTime))}`,
      '',
      projectLines.join('\n'),
      '',
      LEGEND,
      '',
      '',
    ].join('\n'));
  });
};
