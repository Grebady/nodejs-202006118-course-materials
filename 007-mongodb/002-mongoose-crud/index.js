const mongoose = require('mongoose');
const {Schema} = mongoose;

const dbName = 'mongoose_crud';

const url = `mongodb://localhost:27017/${dbName}`;

/**
 * For all available options see
 * @link https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-set
 */
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('debug', true);

const userSchema = new Schema({
  name: String,
  login: {
    type: String,
  },
  email: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  }
}, {});
const User = mongoose.model('user', userSchema);

(async function () {
  await User.deleteMany({});
  const user = new User({
    name: 'Paul',
    email: 'paul@atredias.com',
    login: 'muaddib',
    dateOfBirth: new Date('2000-01-01'),
  });
  console.log(user.id);

  await user.save();
  // const user = await User.create({
  //   name: 'Paul',
  //   email: 'paul@atredias.com',
  //   login: 'muaddib'
  // });

  user.login = 'muad-dib';
  await user.save();

  user.dateOfBirth.setMonth(9);
  user.markModified('dateOfBirth');
  await user.save();

  await User.deleteOne({_id: user._id});

  await mongoose.disconnect()
})();

