const db = require("../config/db");

const messageSchema = new db.Schema({
  users:{
    _id1 : String,
    _id2: String
  },
  messages: [
    {
      message: String,
      fromUserId: String,        
      time: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const Messages = new db.model("Messages", messageSchema);

async function createMessage(id1, id2, msg) {
  try {
    let messageId = null;
    if (id1 < id2)
      messageId = await findMessageId(id1, id2);
    else messageId = await findMessageId(id2, id1);

    let userFrom = id1;

    if (!messageId) {
      let newMessage = null;
      if (id1 < id2)
        newMessage = new Messages({
          users:{
            _id1: id1,
            _id2: id2
          },
          fromUserId: userFrom,
          messages: []
        });
      else
        newMessage = new Messages({
          users: {
            _id1: id2,
            _id2: id1
          },
          messages: []
        });
      message = await newMessage.save();
      messageId = message._id;
    }

    newMessage = new Messages({messages: [{message: msg, fromUserId: userFrom}]});
    newMessage = newMessage.messages[0];
    // delete newMessage._id;
    console.log(newMessage);
     await Messages.updateOne(
      { _id: messageId },
      { $push: { messages: newMessage } }
    );
    return newMessage;
  } catch (err) {
    console.log(err);
    return err.message;
  }
}

async function findMessageId(id1, id2) {
  try {
    const message = await Messages.findOne({ users: {_id1: id1, _id2: id2} });
    if (message) return message._id;
    else return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getMessage(id1, id2) {
  try {
    let messageDetails = [];
    if(id1<id2)
      messageDetails = await Messages.findOne({users: {_id1: id1, _id2: id2}});
    else
      messageDetails = await Messages.findOne({users: {_id1: id2, _id2: id1}});

    if (messageDetails) return messageDetails.messages;
    else return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  createMessage,
  getMessage
};
