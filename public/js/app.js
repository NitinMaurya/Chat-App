var socket = io();
socket.on('connect',function (){
    console.log('User is Connected!');
});