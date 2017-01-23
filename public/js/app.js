//var io = require('socket.io');
var socket = io();

socket.on('connect',function (){
    console.log('User is Connected!');
});

socket.on('message',function (message){
    var timestamp = moment.utc(message.timestamp);
    console.log('New Message : ');
    console.log(message.text);
    jQuery('.messages').append('<p><strong>' + timestamp.local().format('MMM Do YYYY, h:mm a : ') +  '</strong>' + message.text + '</p>');
});
var $form = jQuery('#message-form');
$form.on('submit',function(event){
    event.preventDefault();
    var $message = $form.find('input[name=message]');
    socket.emit('message',{
        text : '<br />' + $message.val()
    });
    $message.val('');
});