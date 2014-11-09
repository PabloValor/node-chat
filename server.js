var express = require('express');
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

var port = process.env.PORT || 8000;


/*****       assets (css/js/img)    *****/

app.use('/public', express.static(__dirname + '/public')); 


/*****      Simple router config    *****/

app.get('/', function (req, res) {
      res.sendFile(__dirname + '/views/index.html');
});


/*****      Socket config    *****/

io.on('connection', function(user){
    console.log('User connected');

    user.on('disconnect', function () {
        console.log('User left the chat');
    });

    user.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});


http.listen(port, function() {
    console.log('App running on port: ' + port);
});