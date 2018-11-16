// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function() {
  return async context => {
    const id = context.result._id;
    const associatedLessons = await context.app
      .service('lessons')
      .find({ query: { materials: id } });
    associatedLessons.data.forEach(lesson => {
      context.app
        .service('lessons')
        .patch(lesson._id, { $pull: { materials: id } });
    });
    return context;
  };
};
