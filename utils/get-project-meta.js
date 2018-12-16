/**
 * Figures
 *
 * @param {Function}  cb    Callback function
 */
module.exports = (projects) => {
  const meta = {
    byId: {},
    maxId: -1,
  };
  Object.keys(projects).forEach(projectSlug => {
    const id = projects[projectSlug].id;
    meta.byId[id] = projects[projectSlug];
    meta.maxId = Math.max(meta.maxId, id);
  });
  return meta;
};
