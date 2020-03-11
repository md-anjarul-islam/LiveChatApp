const db = require("../config/db");

const userSchema = new db.Schema({
  name: String,
  email: String,
  password: String,
  socketId: String
});

const User = new db.model("Users", userSchema);

async function createUser(aUser, socketId) {
  try {
    aUser.socketId = socketId;
    const newUser = new User(aUser);
    return await newUser.save();
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function login(user, socketId){
  try{
    return await User.updateOne(user, {$set: {socketId: socketId}});
  }catch(err){
    console.log(err);
    return null;
  }
}

async function findUser(userInfo) {
  try {
    return await User.findOne(userInfo).select({ password: 0 });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function findAllUser() {
  try {
    return await User.find().select({ password: 0 });
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  createUser,
  findUser,
  findAllUser,
  login
};
