// materials-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const materials = new Schema(
    {
      title: { type: String, required: true },
      uri: { type: String, required: true },
      type: String,
      notes: String
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('materials', materials);
};
