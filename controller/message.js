const messageHandler = require('../model/message');
const notificationService = require('../util/notification')

async function getMessage(req, res) {
    let id1 = req.headers.user._id;
    let id2 = req.params.userId;
    console.log(id1, id2);
    try{
      const messages = await messageHandler.getMessage(id1, id2);
      res.json(messages);
    }catch(err){
      res.json({message: "Error!"});
    }
  };

async function postMessage (req, res){
    let newMessage = req.body.message;
    let id1 = req.headers.user._id;
    let id2 = req.params.userId;
  
    try{
      newMessage = await messageHandler.createMessage(id1, id2, newMessage);
      user2 = await userHandler.findUser({_id: id2});
      notificationService.notifyToUser(user2.socketId,"updateMessage", newMessage);
      res.json(newMessage);
    }catch(err){
      res.json({message: "Error!"});
    }
  };

  module.exports = {
      getMessage,
      postMessage
  }