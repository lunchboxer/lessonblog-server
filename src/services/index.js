const groups = require('./groups/groups.service.js');
const users = require('./users/users.service.js');
const lessons = require('./lessons/lessons.service.js');
const materials = require('./materials/materials.service.js');
const tags = require('./tags/tags.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(groups);
  app.configure(users);
  app.configure(lessons);
  app.configure(materials);
  app.configure(tags);
};
