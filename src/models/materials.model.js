// materials-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const ObjectId = Schema.Types.ObjectId;
  const materials = new Schema(
    {
      title: { type: String, required: true },
      uri: { type: String, required: true },
      type: String,
      notes: String,
      tags: { type: [ObjectId], ref: 'tags' }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('materials', materials);
};
