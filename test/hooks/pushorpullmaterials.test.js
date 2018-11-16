const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const pushorpullmaterials = require('../../src/hooks/pushorpullmaterials');

describe('\'pushorpullmaterials\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: pushorpullmaterials()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
