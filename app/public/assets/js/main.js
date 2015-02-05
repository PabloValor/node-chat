$(document).on('ready', function() {
	//initialize jquery objects
	var $message = $('#m');
	var socket = io();


	//login 
	$('input')[0].focus();

	//send message from the client 
	$('#send-messages-form').on('submit', function() {
		message = $message.val();
		socket.emit('chat message', message);
		$message.val('');
		return false;
	});

	//recive data from the server and show it on browser
	socket.on('chat message', function(msg){
		$('#messages').append($('<li>').text(msg));
	});



	//socket.emit('new message', {message: 'HEHEUEH'});
});