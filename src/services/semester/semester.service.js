// Initializes the `semester` service on path `/semester`
const createService = require('feathers-sequelize');
const createModel = require('../../models/semester.model');
const hooks = require('./semester.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/semester', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('semester');

  service.hooks(hooks);
};
