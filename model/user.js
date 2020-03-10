const db = require("../config/db");

const userSchema = new db.Schema({
  username: String,
  password: String,
 });

const User = new db.model("Users", userSchema);

async function createUser(aUser) {
  try {
    const newUser = new User(aUser);
    return await newUser.save();
  } catch (err) {
    return err;
  }
}

async function findUser(userInfo) {
  try{
    return await User.findOne(userInfo).select({ password: 0 });    
  }catch(err){
    return err;
  }
}

module.exports = {
  createUser,
  findUser 
};