module.exports = function(app) {

  app.get('/', function(req, res) {
    res.send({ message: 'Super secret code is abc123' });
  });

}
