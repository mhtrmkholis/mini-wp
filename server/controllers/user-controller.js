const User = require('../models/user');
const Article = require('../models/article');
const Helper = require('../helpers/helper');
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static signup(req, res, next) {
    User.create(req.body)
      .then(user => {
        const myToken = Helper.generateJWT({
          _id: user._id,
          name: user.name,
          email: user.email,
        })
        res.status(200).json({ token: myToken, name: user.name, id: user._id })
      })
      .catch(next)
  }

  // static list(req, res, next) {
  //   User.find()
  //     .then(user => {
  //       if (user) res.status(200).json(user)
  //       else res.status(400).json('User not found')
  //     })
  //     .catch(next)
  // }

  static signin(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ email })
      .then(user => {
        if (!user) throw { status: 404, message: 'Your email or password wrong' };
        else if (!Helper.comparePassword(password, user.password)) throw { status: 404, message: 'Your email or password wrong' };
        else {
          const myToken = Helper.generateJWT({
            _id: user._id,
            name: user.name,
            email: user.email,
          })
          res.status(200).json({ token: myToken, name: user.name, id: user._id })
        }
      })
      .catch(next)
  }

  static googleSignin(req, res, next) {
    console.log('masok')
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    let { name, email } = {}
    client.verifyIdToken({
      idToken: req.headers.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket => {
      name = ticket.getPayload().name
      email = ticket.getPayload().email
      return User.findOne({ email })
    })
    .then(user => {
      if (user) return user
      else {
        let password = Helper.generatePassword()
        return User.create({ name, email, password })
      }
    })
    .then(user => {
      const myToken = Helper.generateJWT({
        _id: user._id,
        name: user.name,
        email: user.email,
      })
      res.status(200).json({ token: myToken, name: user.name, id: user._id })
    })
    .catch(next)
  }
}

module.exports = UserController