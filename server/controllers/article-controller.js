const Article = require('../models/article');
const Tag = require('../models/tag');

class ArticleController {
  static create(req, res, next) {
    const { title, content, tags } = req.body
    const image = req.file ? req.file.cloudStoragePublicUrl : ''
    let parseTags = JSON.parse(tags).map(el => el.toLowerCase())
    let newArticle = {}
    
    Article.create({ title, content, image, tags: parseTags, UserId: req.decoded._id })
      .then(article => {
        newArticle = article
        if (parseTags.length) {
          parseTags.forEach(el => {
            Tag.findOne({ name: el })
              .then(found => {
                if (!found) return Tag.create({ name: el, ArticleId: [newArticle._id] })
                else return Tag.findByIdAndUpdate(found._id, { "$push": { "ArticleId": newArticle._id } }, { "new": true, "upsert": true })
              })
              .then(() => { })
              .catch(next)
          })
        }
      })
      .then(() => res.status(201).json(newArticle))
      .catch(next)
  }

  static findAll(req, res, next) {
    Article.find()
      .sort({ createdAt: -1 })
      .populate('UserId', 'name')
      .then(articles => res.status(200).json(articles))
      .catch(next)
  }

  static findMyArticles(req, res, next) {
    Article.find({ UserId: req.headers.id })
      .sort({ createdAt: -1 })
      .populate('UserId', 'name')
      .then(articles => res.status(200).json(articles))
      .catch(next)
  }

  static findOne(req, res, next) {
    Article.findById(req.params.id)
      .populate('UserId', 'name')
      .then(article => res.status(200).json(article))
      .catch(next)
  }

  static update(req, res, next) {
    console.log(req.file)
    // if (req.file) obj.image = req.file.cloudStoragePublicUrl

    Article.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(article => {
        console.log(article)
        res.status(200).json(article)
      })
      .catch(next)
  }

  static destroy(req, res, next) {
    Article.findByIdAndDelete(req.params.id)
      .then(article => res.status(200).json(article))
      .catch(next)
  }

  static search(req, res, next) {
    
  }
}

module.exports = ArticleController