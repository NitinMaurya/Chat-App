/**
 * Created by nitin on 21/1/17.
 */
var PORT = process.env.PORT || 8000;
var moment = require('moment');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/public'));
var clientInfo ={};

function sendCurrentUsers(socket){
    var info = clientInfo[socket.id];
    var users=[];
    if(typeof info=== 'undefined'){
        return;
    }
    Object.keys(clientInfo).forEach(function (socketId){
        var userInfo = clientInfo[socketId];
        if(info.room === userInfo.room){
            users.push(userInfo.name);

        }
    });
    socket.emit('users',{
        name: 'System',
        flag : 1
    });
    socket.emit('users',{
        name : users[0],
        flag : 0,
        text : 'Admin'
    });

   for(var i=1;i<users.length;i++){
        socket.emit('users',{
        name  : users[i],
        flag : 0
    });
   }
users.length=0;
}
io.on('connection',function (socket){
    console.log('User Connected via Socket.io!');

    socket.emit('message',{
        name:   'Logged on at',
        text : 'Start Chatting!!',
        timestamp : moment().valueOf()
    });
    socket.on('disconnect',function (){
       if(typeof clientInfo[socket.id] !== 'undefined'){
           socket.leave(clientInfo[socket.id].room);
          io.to(clientInfo[socket.id].room).emit('message',{
              name : 'System Message',
               text : clientInfo[socket.id].name + ' has left!',
               timestamp : moment.valueOf()
           });
           delete clientInfo[socket.id];
       }
    });
    socket.on('chatRoom',function(req){
        clientInfo[socket.id] = req;
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message',{
            name: 'System Message',
            text : '<strong>' +req.name + '</strong>' + ' has joined!',
            timestamp : moment.valueOf()
        });
    });
    socket.on('message',function (message){
            console.log('Message Received : ' + message.text);
            message.timestamp = moment().valueOf();
            io.to(clientInfo[socket.id].room).emit('message', message);
    });
    socket.on('users',function(){
        sendCurrentUsers(socket);
    });
});
http.listen(PORT,function (){
    console.log('Server is running at port ' + PORT + '....' );
});