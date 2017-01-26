//var io = require('socket.io');
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();
console.log(name + ' wants to join ' + room);
socket.on('connect',function (){
    console.log( name +' is Connected!');
    socket.emit('chatRoom',{
        name: name,
        room: room
    });

});
jQuery('.rooms').text('Welcome to ' + room + '!');
socket.on('message',function (message){
    var timestamp = moment.utc(message.timestamp);
    console.log('New Message : ');
    console.log(message.text);
    $message = jQuery('.messages');
    $message.append('<p><strong>' + message.name + ': </strong>' + timestamp.local().format('MMM Do YYYY, h:mm a =>') +  '</p>');
    $message.append(  message.text );
    $message.append('<p><strong>---------------------------------------------------------</strong></p>');
});
var $form = jQuery('#message-form');
$form.on('submit',function(event){
    event.preventDefault();
    var $message = $form.find('input[name=message]');
    socket.emit('message',{
        name : name,
        text : $message.val()
    });
    $message.val('');
});