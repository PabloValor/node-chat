var http		= require('http'),
	express 	= require('express')
	app 		= express(),
	server 		= http.createServer(app),
	bodyParser 	= require('body-parser'),
	io 			= require('socket.io')(server),
	swig 		= require('swig'),
	session 	= require('express-session'),
	cookieParser= require('cookie-parser');

var port = process.env.PORT || 3030;

/* set view engine Swig */
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/public/views/');
//changed {{ }} by [[ ]] to avoid conflicts with angularjs
//swig.setDefaults({varControls: ['[[',']]']});


//set static files
app.use(express.static(__dirname + '/app/public/assets/'));

//Models?
var users = [];
var newUserName;

//middlewares
app.use(cookieParser());
app.use(session({secret: '123secret'}));
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
	req.session.username = req.body.username; newUserName = req.body.username;
	res.redirect('/');
});

app.get('/', isnotLogged , function(req, res){
	res.render('chat',{});
});

// Socket.io events listener

io.on('connection', function(socket){
	socket.nickname = newUserName;

	socket.on('chat message', function(msg){
		io.emit('chat message', {msg: msg, username: socket.nickname});
	});

	io.sockets.emit('users counter', {usersCount: users.length});
	io.sockets.emit('show newUser', {username: newUserName});

	socket.on('disconnect', function(){
		removeInArray(users, socket.nickname);
		io.sockets.emit('user offline',{username: socket.nickname});
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