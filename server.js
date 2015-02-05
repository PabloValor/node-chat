var http = require('http'),
	express = require('express');
	app = express(),
	server = http.createServer(app),
	bodyParser = require('body-parser'),
	io = require('socket.io')(server),
	swig = require('swig');

var port = process.env.PORT || 3030;

/* set view engine Swig */
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/public/views/');
//changed {{ }} by [[ ]] to avoid conflicts with angularjs
//swig.setDefaults({varControls: ['[[',']]']});

//middlewares
app.use(bodyParser.urlencoded({extended: true}));

//set static files
app.use(express.static(__dirname + '/app/public/assets/'));

//Models?
var user = {};

//routes
app.get('/login', function(req, res){
	res.render('login',{});
});

app.post('/', function(req, res){
	var user = {
		name: req.body.userName
	}
	res.render('chat',user);
});

//chatroom

//users connected
var usernames = {};
var numUsers = 0;

io.on('connection', function(socket){

	var addUser = false;
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});

server.listen(port, function(){
	console.log('listening on port: %d', port);
});