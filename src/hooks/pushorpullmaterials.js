// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function() {
  return async context => {
    if (!context.data.materials) {
      return context;
    }
    const { push, pull } = context.params.query;
    if (push) {
      context.app.service('lessons').patch(context.id, {
        $push: { materials: context.data.materials }
      });
      delete context.data.materials;
      delete context.params.query.push;
    }
    if (pull) {
      context.app.service('lessons').patch(context.id, {
        $pull: { materials: { $in: context.data.materials } }
      });
      delete context.data.materials;
      delete context.params.query.pull;
    }
    return context;
  };
};
