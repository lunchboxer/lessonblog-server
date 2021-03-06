// lessons-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  var ObjectId = Schema.Types.ObjectId;
  const lessons = new Schema(
    {
      title: String,
      date: { type: Date, default: Date.now, required: true },
      number: { type: Number, required: true },
      summary_EN: { type: String },
      summary_ZH: String,
      group: { type: ObjectId, ref: 'groups' },
      materials: { type: [ObjectId], ref: 'materials' },
      published: { type: Boolean, default: false}
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('lessons', lessons);
};
