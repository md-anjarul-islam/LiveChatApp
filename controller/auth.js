const userHandler = require('../model/user');
const notificationService = require('../util/notification')

async function register(req, res) {
  try{
    let newUser = await userHandler.createUser(req.body.user, req.body.socketId);
    notificationService.notifyOthers("updateUser", newUser);
    let token = newUser.getAuthToken();
    res.set({"x-token":token}).json(newUser);
  } catch(err){
    res.status(401).json({message: "User registration failed!"});
  }
};

async function login(req, res) {
  try{
    let loggedUser = await userHandler.login(req.body.user, req.body.socketId);
    if( !loggedUser ) throw({message: "User login failed!"});
    loggedUser = await userHandler.findUser(req.body.user);
    let allUser = await userHandler.findAllUser();
    notificationService.notifyOthers("updateUser", allUser);
    let token = loggedUser.getAuthToken();
    res.set({"x-token":token}).json(loggedUser);
    } catch(err) {
      console.log(err);
      res.status(401).json({message: "User login failed!"});
    }
  };

  module.exports = {
      register,
      login
  }