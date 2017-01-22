/**
 * Created by nitin on 21/1/17.
 */
var PORT = process.env.PORT || 3001;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/public'));
io.on('connection',function (){
    console.log('User Connected via Socket.io!');
});
http.listen(PORT,function (){
    console.log('Server is running at port ' + PORT + '....' );
});