// Initializes the `materials` service on path `/materials`
const createService = require('feathers-mongoose');
const createModel = require('../../models/materials.model');
const hooks = require('./materials.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/materials', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('materials');

  service.hooks(hooks);
};
