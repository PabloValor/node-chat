var http = require('http'),
	express = require('express');
	app = express(),
	server = http.createServer(app),
	socket = require('socket.io')(server),
	swig = require('swig');

var port = process.env.PORT || 3030;

/* set view engine Swig */
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/public/views/');
//changed {{ }} by [[ ]] to avoid conflicts with angularjs
swig.setDefaults({varControls: ['[[',']]']});

//set static files
app.use(express.static(__dirname + '/app/public/assets/'));

//routes
app.get('/', function(req, res){
	res.render('chat',{});
});




//chatroom

//users connected
var usernames = {};
var numUsers = 0;

socket.on('connection', function(socket){

	var addUser = false;

	socket.on('new message', function(data) {
		console.log(data.message);
	});

	
});

server.listen(port, function(){
	console.log('listening on port: %d', port);
});