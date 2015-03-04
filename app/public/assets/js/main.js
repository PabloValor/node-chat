$(window).on('load', function(){
	$('#loader-wrapper').fadeOut(1000);
});
$(document).on('ready', function() {
	//initialize jquery objects
	var $message = $('#m');
	var socket = io();
	var $scrollbar = $('section.mCustomScrollbar');

	//return String hh:mm
	var getCurrentTime = function() {
		var date = new Date();
		return date.getHours() + ":" + date.getMinutes();
	}

	//ititialize custom scrollbar
	$scrollbar.mCustomScrollbar({
	 	scrollButtons: {
        	enable: true
    	}
	});

	//update ScrollBar
	function updateScrollBar() {
		$scrollbar.mCustomScrollbar('scrollTo','-=99999', {
			scrollEasing:"easeOut",
			scrollInertia: 600
		});
	}

	//get the focus, ready to write 
	$message.focus();


	//if user click the logo, back to the home
	$('#logo').on('click', function(event) {
		//Setup sweetAlert Jquery plugin 
		event.preventDefault();
		swal({
			title: 'Do you want go out?',
			text: 'You will be redirect to login page',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Sure!",
			closeOnConfirm: false,
			closeOnCancel: false
		},
		function(isConfirm){
			if(isConfirm) {
				swal({title: 'See you later',
					type: 'success'
				},
				function(isConfirm) {
					socket.emit('logout', {});
					window.location = "/login";					
				}
				);

			} else {
				 swal("Cancelled", "Continue chatting!", "error");
			}
		});
	});


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
		$('#messages').append(
			'<li class="animated fadeInUp pure-g">'+ 
				'<div class="user pure-u-1 pure-u-md-1-5">'+
					data.username +
					'<div class="time"> ['+ getCurrentTime() +']</div>'+
				'</div>'+
				'<div class="message pure-u-1 pure-u-md-4-5">'+ 
					'<div class="arrow-left"></div>'+
					data.msg +
				'</div>'+ 	
			'</li>'
		);

		updateScrollBar();
	});

	//show message when new user is online
	socket.on('show newUser', function(data){

		var element = $('<li>')
						.text(data.username + ' is online  ' + '['+ getCurrentTime()+']')
						.addClass('text-center new-user animated fadeInUp');

		element.prepend($('<i>').addClass('fa fa-user-plus'));

		$('#messages').append(element);
		updateScrollBar();
	});

	//show message when an user left the chat
	socket.on('user offline', function(data){

		var element = $('<li>')
				.text(data.username + ' left the chat  ' + '['+ getCurrentTime()+']')
				.addClass('text-center user-offline animated fadeInUp');

		element.prepend($('<i>').addClass('fa fa-user-times'));

		$('#messages').append(element);
		updateScrollBar();
	});

	socket.on('users counter', function(data) {
		$('#usersCount').html('Online: ' + '<strong>' + data.usersCount + '</strong>' + ' Users');
	});
});