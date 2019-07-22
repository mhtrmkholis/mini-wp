const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: [ true, 'Name already exists' ],
    validate: [
      {
        validator: function (name) {
          return new Promise(function (resolve, reject) {
            Tag.findOne({ name })
              .then(data => !data ? resolve(true) : resolve(false))
              .catch(err => reject(err))
          });
        },
        message: props => `${props.value} already exists`
      }
    ]
  },
  ArticleId: [{ type: Schema.Types.ObjectId, ref: 'Article' }]
}, { timestamps: true });

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;