var socket = io();

socket.on('connect',function (){
    console.log('User is Connected!');
});

socket.on('message',function (message){
    console.log('New Message : ');
    console.log(message);
});