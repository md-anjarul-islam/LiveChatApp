const userHandler = require('../model/user');

function notifyToUser(socketId, event, notification){
    global.SOCKET_IO.to(socketId).emit(event, notification);
}
  
async function notifyOthers(event, notification){
    let allUser = await userHandler.findAllUser();
    allUser.forEach(user => notifyToUser(user.socketId, event, notification));
}

module.exports = {
    notifyOthers,
    notifyToUser
}