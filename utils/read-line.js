const { DISCIPLINES } = require('../constants');

module.exports = (ctx, line) => {
    const [pId, dId, start, end, duration] = line.split('|');
    const project = ctx.projectMeta.byId[pId];
    const discipline = DISCIPLINES[dId];
    let time;
    if (duration) {
        time = parseInt(duration, 10);
    } else {
        time = Date.now() - start;
    }
    return { project, discipline, start: parseInt(start, 10), duration: time };
};
