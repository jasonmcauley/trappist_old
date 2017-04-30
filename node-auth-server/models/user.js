const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new  Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next){
  const user = this;

  // Generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // Hash our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err) { return next(err); }

      user.password = hash;

      // Go ahead, save the model
      next();

    })
  });
})

// Add instance method to userSchema
userSchema.methods.comparePassword = function(candidatePassword, callback) {

  // If passwords match, isMatch is true, else false
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
