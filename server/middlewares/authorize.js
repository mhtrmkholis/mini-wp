const Article = require('../models/article');

module.exports = (req, res, next) => {
  if (req.headers.hasOwnProperty('token')) {
    Article.findById(req.params.id)
    .then((article) => {
      console.log(article)
      if (article && article.UserId.toString() == req.decoded._id) next();
      else res.status(403).json({ message: 'Unauthorized' });
    })
    .catch(err => res.status(500).json(err));
  }
  else res.status(401).json({ message: 'Unauthorized'});
}
