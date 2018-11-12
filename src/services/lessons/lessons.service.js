// Initializes the `lessons` service on path `/lessons`
const createService = require('feathers-mongoose');
const createModel = require('../../models/lessons.model');
const hooks = require('./lessons.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/lessons', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('lessons');

  service.hooks(hooks);
};
