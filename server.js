/**
 * Created by nitin on 21/1/17.
 */
var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
app.use(express.static(__dirname + '/public'));
app.listen(PORT,function (){
    console.log('Server is running at port ' + PORT + '....' );
});