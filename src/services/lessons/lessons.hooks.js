const { authenticate } = require('@feathersjs/authentication').hooks;

const populatelesson = require('../../hooks/populatelesson');

module.exports = {
  before: {
    all: [],
    find: [populatelesson()],
    get: [populatelesson()],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
