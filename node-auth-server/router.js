const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// Since we are using cookie based tokens, session is false
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {

  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'Super secret code is abc123' });
  });

  app.post('/signin', requireSignin, Authentication.signin)
  app.post('/signup', Authentication.signup);
}
