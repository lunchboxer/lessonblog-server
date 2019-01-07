const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const moment = require('moment');
const marked = require('marked');
const logger = require('./logger');
const errors = require('@feathersjs/errors');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');
const mongoose = require('./mongoose');
const authentication = require('./authentication');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use('/', express.static(app.get('public')));

moment.locale('zh-cn');

app.get('/', async (req, res, next) => {
  try {
    const groups = await app
      .service('groups')
      .find({ query: { $sort: { name: 1 } } });
    res.render('index', {
      title: '英语课程',
      groups: groups.data
    });
  } catch (error) {
    next(error);
  }
});

app.get('/classes/:name', async (req, res, next) => {
  const { name } = req.params;
  try {
    const groupres = await app.service('groups').find({ query: { name } });
    const group = groupres.data[0];
    // if no group redirect to an error page
    if (!group) throw new errors.NotFound('group does not exist');
    const lessons = await app.service('lessons').find({
      query: { group: group._id, published: true, $sort: { number: -1 } }
    });
    res.render('class', {
      title: `${name}班课程内容`,
      lessons: lessons.data,
      group,
      moment
    });
  } catch (error) {
    next(error);
  }
});

app.get('/summary/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const lesson = await app.service('lessons').get(id);
    const group = await app.service('groups').get(lesson.group);

    const getMaterials = async () => {
      if (!lesson.materials.length) {
        return null;
      }
      const materials = await app
        .service('materials')
        .find({ query: { _id: { $in: lesson.materials } } });
      if (materials.total > 0) {
        return materials.data;
      } else {
        return null;
      }
    };
    const materials = await getMaterials();
    res.render('summary', {
      title: `${group.name}班第${lesson.number}课`,
      lesson,
      group,
      materials,
      moment,
      marked
    });
  } catch (error) {
    next(error);
  }
});
// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(mongoose);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
