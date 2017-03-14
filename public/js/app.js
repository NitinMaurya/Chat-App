/*
var users = require('/home/nitin/WebstormProjects/Project/sockets/server.js');
*/
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
    $messages = jQuery('.messages');
    $message = jQuery('<li  class="list-group-item"></li>');
    if(message.name === 'Logged on at' || message.name === 'System Message'){
        $message.append('<p><strong>' + message.name + ' : </strong><span style="color: GrayText">' + timestamp.local().format('Do MMM YYYY, h:mm a ') + '</span></p>');
        $message.append('<p style="color: royalblue ; font-size: 135%" ><strong>' + message.text + '</strong></p>');
        $messages.append($message);
    }
    else {
        $message.append('<p><strong>' + message.name + ': </strong></p><p style="display: inline " ><span style="color: GrayText">' + timestamp.local().format('h:mm a ') + ': ' +'</span></p>');
        $message.append(message.text);
        $messages.append($message);
    }
    $('#messageWrapper').animate(
        {
            scrollTop: $('#messageWrapper').prop("scrollHeight")
        }, 1000);
});
/*document.getElementById('clickSmiley').onclick = function() {
    $('#clickSmiley').jemoji({
        menuBtn: $('#show-menu'),
        container: $('#clickSmiley').parent().parent()
    });
};*/
socket.on('users',function(users){
    if(users.flag === 1){
        $('.ListOfUsers').remove();
    }
    else{
        $selCurusers = jQuery('.cUsers');
        $selusers = jQuery('<li  class="ListOfUsers list-group-item list-group-item-info"></li>');
        $selusers.append('<p style="text-align: center">' + users.name + '</p>');
        $selCurusers.append($selusers);
    }

});
document.getElementById('currentUsers').onclick=function(){
    socket.emit('users');
};
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