const Tag = require('../models/tag');

class TagController {
  static create(req, res, next) {
    Tag.create(req.body)
      .then(tag => res.status(201).json(tag))
      .catch(next)
  }

  static findAll(req, res, next) {
    Tag.find()
    .limit(6)
      .then(tags => res.status(200).json(tags))
      .catch(next)
  }

  static findOne(req, res, next) {
    if (req.query.name) {
      Tag.findOne({ name: req.query.name })
        .populate({ path: 'ArticleId', populate: { path: 'UserId' } })
        .then(tag => res.status(200).json(tag))
        .catch(next)
    }
    else {
      Tag.find()
        .populate({ path: 'ArticleId', populate: { path: 'UserId' } })
        .then(tag => res.status(200).json(tag))
        .catch(next)
    }
  }
}

module.exports = TagController