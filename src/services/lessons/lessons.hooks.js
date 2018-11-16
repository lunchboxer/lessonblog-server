const { authenticate } = require('@feathersjs/authentication').hooks;

const populatelesson = require('../../hooks/populatelesson');

const pushorpullmaterials = require('../../hooks/pushorpullmaterials');

module.exports = {
  before: {
    all: [],
    find: [populatelesson()],
    get: [populatelesson()],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt'), pushorpullmaterials()],
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
