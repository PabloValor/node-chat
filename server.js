var http			= require('http'),
	express 		= require('express'),
	app 			= express(),
	server 			= http.createServer(app),
	bodyParser 		= require('body-parser'),
	io 				= require('socket.io')(server),
	swig 			= require('swig'),
	session 		= require('express-session'),
	FirebaseStore 	= require('connect-firebase')(session),
	socketIOSession	= require('socket.io.session'),
	cookieParser 	= require('cookie-parser'),
	favicon 		= require('serve-favicon');

var port = process.env.PORT || 3030;

/* set view engine Swig */
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/public/views/');
//changed {{ }} by [[ ]] to avoid conflicts with angularjs
//swig.setDefaults({varControls: ['[[',']]']});


//set static files
app.use(express.static(__dirname + '/app/public/assets/'));

//Current users collection
var users = [];

//set favicon
app.use(favicon(__dirname + '/favicon.ico'));

//middlewares
app.use(cookieParser());

/*  Prepare Session */
var options = {

  // The Firebase URL 
  host: 'chat-zen.firebaseio.com',

  // Optional. How often expired sessions should be cleaned up.
  // 86400000 miliseconds (24 hours).
  reapInterval: 86400000

  // Optional. A Firebase authentication token
  //token: 'qKtOKAQSTCxLFJI7uSeof6H7cfLpSuWYOhqOTQqz'
};

var sessionStore = new FirebaseStore(options);

var sessionSettings = {
	store: sessionStore, 
  	secret: 'keyboard cat' 
};
app.use(session(sessionSettings));

app.use(bodyParser.urlencoded({extended: true}));


var isnotLogged = function(req, res, next) {
	if(!req.session.username) {
		res.redirect('/login');
		return;
	}
	next();
}

var isLogged = function(req, res, next) {
	if(req.session.username) {
		res.redirect('/');
		return;
	}
	next();
} 

// routes
app.get('/login', isLogged, function(req, res){
	res.render('login',{});
});

app.post('/login', function(req, res){
	users.push(req.body.username);
	req.session.username = req.body.username;
	res.redirect('/');
});

app.get('/', isnotLogged , function(req, res){
	users.push(req.body.username);
	res.render('chat',{});
});

// Socket.io events listener

//socket.session == req.session, change one of them, the other one change too
var socketSession = socketIOSession(sessionSettings);
io.use(socketSession.parser);

io.on('connection', function(socket){

	io.sockets.emit('users counter', {usersCount: users.length});

	socket.on('chat message', function(msg){
		io.emit('chat message', {msg: msg, username: socket.session.username});
	});

	io.sockets.emit('users counter', {usersCount: users.length});
	io.sockets.emit('show newUser', {username: socket.session.username});

	socket.on('disconnect', function(){
		removeInArray(users, socket.session.username);

		io.sockets.emit('user offline',{username: socket.session.username});
		io.sockets.emit('users counter', {usersCount: users.length});
	});		
});

server.listen(port, function(){
	console.log('listening on port: %d', port);
});


//remove user from the User array
 function removeInArray(arr, item) {
      for(var i = arr.length; i--;) {
          if(arr[i] === item) {
              arr.splice(i, 1);
          }
      }
  }