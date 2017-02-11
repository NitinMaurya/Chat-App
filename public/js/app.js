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
    $messages = jQuery('.messages');
    $message = jQuery('<li class="list-group-item"></li>');
    if(message.name === 'Logged on at' || message.name === 'System Message'){
        $message.append('<p><strong>' + message.name + ' : </strong><span style="color: GrayText">' + timestamp.local().format('Do MMM YYYY, h:mm a ') + '</span></p>');
        $message.append('<p style="color: darkred"><h4><strong>' + message.text + '</strong></h4></p>');
        $messages.append($message);
    }
    else {
        $message.append('<p><strong>' + message.name + ': </strong></p><p style="display: inline " ><span style="color: GrayText">' + timestamp.local().format('h:mm a ') + ': ' +'</span></p>');
        $message.append(message.text);
        $messages.append($message);
    }
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