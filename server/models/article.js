const mongoose = require('mongoose');
// mongoose.set('useCreateIndex', true);
const { Schema } = mongoose;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: [ true, 'Content can not be blank' ]
    },
    image: {
        type: String,
    },
    tags : [String],
    UserId : { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article
