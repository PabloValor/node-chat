$(document).on('ready', function() {
	//initialize jquery objects
	var $message = $('#m');
	var socket = io();
	var $scrollbar = $('section.mCustomScrollbar');
	//var $textarea = $('textarea');

	//ititialize custom scrollbar
	$scrollbar.mCustomScrollbar({
		autoDraggerLength: true,
	 	autoExpandScrollbar: true,
	 	scrollButtons: {
        	enable: true
    	},
	 	advanced:{ 
	 		updateOnContentResize: true,
	 		updateOnImageLoad: true
	 	}

	});

	//autoscroll when data is added FIX THIS!!!!
	function updateScroll() {
		$scrollbar.animate({
			scrollTop: $('#messages')[0].scrollHeight
		}, 900);
	}

	//***** wow animations | login  page*****//
	//new WOW().init();

	$message.focus();


	//submit the textarea content when press Enter
	$message.keypress(function(e){
  		if(e.which == 13){
    		if($message.val() != "") {
    			$('#send-messages-form').submit();
    		}
    		return false; //prevent duplicate submission
  		}
	});

	//send message from the client 
	$('#send-message-button').on('click', function() {
			$('#send-messages-form').submit();
	});
	
	$('#send-messages-form').on('submit', function() {
		message = $message.val();
		socket.emit('chat message', message);
		$message.val('');
		$message.focus();
		return false;
	});

	//recive client message from the server and show it on browser
	socket.on('chat message', function(data){
		$('#messages').append($('<li>')
							.text(data.username + ': '+ data.msg)
							.addClass('animated fadeInUp message'));
		//COMPLETE THIS !!
		//update the scroll
		//updateScroll();
	});

	//show message when new user is online
	socket.on('show newUser', function(data){

		var element = $('<li>')
						.text(data.username + ' is online')
						.addClass('text-center new-user animated fadeInUp');

		element.prepend($('<i>').addClass('fa fa-user-plus'));

		$('#messages').append(element);
	});

	//show message when an user left the chat
	socket.on('user offline', function(data){

		var element = $('<li>')
				.text(data.username + ' left the chat')
				.addClass('text-center user-offline animated fadeInUp');

		element.prepend($('<i>').addClass('fa fa-user-times'));

		$('#messages').append(element);
	});

	socket.on('users counter', function(data) {
		$('#usersCount').html('Online: ' + '<strong>' + data.usersCount + '</strong>' + ' Users');
	});
});