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
io.on('connection',function (socket){
    console.log('User Connected via Socket.io!');
    socket.emit('message',{
        name:   'Logged on at: ',
        text : '<center><b>Start Chatting!!</b></center>',
        timestamp : moment().valueOf()
    });
    socket.on('message',function (message){
        console.log('Message Received : ' +  message.text);
        message.timestamp = moment().valueOf();
        io.emit('message',message);

    });
});
http.listen(PORT,function (){
    console.log('Server is running at port ' + PORT + '....' );
});