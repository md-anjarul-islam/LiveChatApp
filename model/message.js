const db = require("../config/db");

const messageSchema = new db.Schema({
  person1: {
    _id: String,
    name: String
  },
  person2: {
    _id: String,
    name: String
  },
  messages: [
    {
      message: String,
      from: String,
      time: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const Messages = new db.model("Messages", messageSchema);

async function createMessage(user1, user2, msg) {
  try {
    let messageId = null;
    if (user1._id < user2._id) messageId = await findMessageId(user1, user2);
    else messageId = await findMessageId(user2, user1);

    let userFrom = user1.name;

    if (!messageId) {
      let newMessage = null;
      if (user1._id < user2._id)
        newMessage = new Messages({
          person1: user1,
          person2: user2,
          messages: []
        });
      else
        newMessage = new Messages({
          person1: user2,
          person2: user1,
          messages: []
        });
      message = await newMessage.save();
      messageId = message._id;
    }

    return await Messages.updateOne(
      { _id: messageId },
      { $push: { messages: { message: msg, from: userFrom } } }
    );
  } catch (err) {
    return err.message;
  }
}

async function findMessageId(user1, user2) {
  try {
    const message = await Messages.findOne({ person1: user1, person2: user2 });
    const messageId = message._id;
    if (messageId) return messageId;
    else return null;
  } catch (err) {
    return null;
  }
}

async function getMessage(user1, user2) {
  try {
    const messageDetails = await Messages.findOne().or([
      { person1: user1, person2: user2 },
      { person1: user2, person2: user1 }
    ]);

    if (messageDetails) return messageDetails.messages;
    else return null;
  } catch (err) {
    return null;
  }
}

module.exports = {
  createMessage,
  getMessage
};
