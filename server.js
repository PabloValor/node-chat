var express = require('express');
    app = express(),
    http = require('http').Server(app);
    io = require('socket.io')(http);

var port = process.env.PORT || 8000;

app.use('/public', express.static(__dirname + '/public')); // assets (css/js/img)


app.get('/', function (req, res) {
      res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
    console.log('User connected');

    socket.on('disconnect', function () {
        console.log('User left the chat');
    });

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

http.listen(port, function() {
    console.log('App running on port: ' + port);
});