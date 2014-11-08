var express = require('express'),
      socket = require('socket.io');

app = express();


var port = process.env.PORT || 8000;

app.use('/public', express.static(__dirname + '/public')); // assets (css/js/img)


app.get('/', function (req, res) {
      res.sendFile(__dirname + '/views/index.html');
});

app.listen(port, function() {

      console.log('App running on port: ' + port);
});