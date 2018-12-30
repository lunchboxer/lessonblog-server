const fs = require('fs');
const logger = require('../logger');

module.exports = function() {
  return async context => {
    if (context.path === 'authentication') {
      return context;
    }
    if (context.path === 'groups') {
      const res = await context.service.find({ query: { $sort: { name: 1 } } });
      if (res.total === 0) {
        return context;
      }
      const string = JSON.stringify(res.data);
      const path = `./src/data/${context.path}.json`;
      fs.writeFile(path, string, 'utf8', error => {
        if (error) logger.error(error);
        else logger.debug(`${context.path} data exported successfully!`);
      });
    }
    if (context.path === 'materials') {
      const res = await context.service.find({
        query: { $sort: { created: -1 } }
      });
      if (res.total === 0) {
        return context;
      }
      const string = JSON.stringify(res.data);
      const path = `./src/data/${context.path}.json`;
      fs.writeFile(path, string, 'utf8', error => {
        if (error) logger.error(error);
        else logger.debug(`${context.path} data exported successfully!`);
      });
    }

    if (context.path === 'lessons') {
      const id = context.id ? context.id : context.data._id;
      if (!id) return context;
      const lesson = await context.service.get(id);
      if (!lesson) return context;
      const { group } = lesson;
      const res = await context.service.find({
        query: { group, $sort: { number: -1 } }
      });
      if (res.total === 0) {
        return context;
      }
      const data = JSON.stringify(res.data);
      const path = `./src/data/lessons/${group}.json`;
      fs.writeFile(path, data, error => {
        if (error) logger.error(error);
        else logger.debug(`${context.path} data exported successfully!`);
      });
    }

    return context;
  };
};
