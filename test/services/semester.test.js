const assert = require('assert');
const app = require('../../src/app');

describe('\'semester\' service', () => {
  it('registered the service', () => {
    const service = app.service('semester');

    assert.ok(service, 'Registered the service');
  });
});
