$(document).on('ready', function() {
	var socket = io();
	socket.emit('new message', {message: 'HEHEUEH'});
});