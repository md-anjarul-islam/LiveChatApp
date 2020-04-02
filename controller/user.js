const userHandler = require('../model/user');

async function getProfile(req, res){
    let user = req.headers.user;
    try{
      profile = await userHandler.findUser({_id: user._id});
      res.json(profile);
    }catch(err){
      res.status(404).json({message: "Unauthorized Access!"})
    }
  }
  
  async function updateProfile(req, res){

  }

  async function getAllUser(req, res){
    try{
      let allUser = await userHandler.findAllUser();
      res.json(allUser);
    } catch(err){
      res.status(400).json({message: "Error getting data!"});
    }
  }
  
  module.exports = {
      getProfile,
      updateProfile,
      getAllUser
  }