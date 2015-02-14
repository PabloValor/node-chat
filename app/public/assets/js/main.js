$(document).on('ready', function() {
	//initialize jquery objects
	var $message = $('#m');
	var socket = io();

	

	//***** wow animations | login  page*****//
	//new WOW().init();

	//send message from the client 
	$('#send-messages-form').on('submit', function() {
		message = $message.val();
		socket.emit('chat message', message);
		$message.val('');
		return false;
	});

	//recive client message from the server and show it on browser
	socket.on('chat message', function(data){
		$('#messages').append($('<li>').text(data.username + ': '+ data.msg));
	});

	socket.on('show newUser', function(data){
		$('#messages').append($('<li class="text-center">').text(data.username + ' is online'));
	});

	socket.on('user offline', function(data){
		$('#messages').append($('<li class="text-center">').text(data.username + ' is offline'));
	});

	socket.on('users counter', function(data) {
		$('#usersCount').html('Online: ' + data.usersCount + ' Users');
	});
});