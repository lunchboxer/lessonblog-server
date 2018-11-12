// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function() {
  return async context => {
    context.params.query = { $populate: 'group' };
    return context;
  };
};
