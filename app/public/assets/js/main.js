$(window).on('load', function(){
	$('#loader-wrapper').fadeOut(1000);
});
$(document).on('ready', function() {
	//initialize jquery objects
	var $message = $('#m');
	var socket = io();
	var $scrollbar = $('section.mCustomScrollbar');
	var arrayColours = [
						'rgba(86,79,233,.79)',
						'rgba(33, 91, 240, 0.79)',
						'rgba(45, 179, 92, 0.79)',
						'rgba(224, 26, 102, 0.79)',
						'rgba(231, 37, 21, 0.79)',
						'rgba(167, 33, 182, 0.79)',
						'rgba(51, 183, 200, 0.79)',
						'rgba(179, 45, 45, 0.79)',
						'rgba(45, 152, 179, 0.79)',
						'rgba(69, 118, 212, 0.79)',
						'rgba(26, 224, 195, 0.79)',
						'rgba(160, 196, 89, 0.79)',
						'rgba(250, 153, 19, 0.79)',
						'rgba(47, 79, 154, 0.79)',
						'rgba(219, 220, 32, 0.79)',
						'rgba(235, 81, 155, 0.79)',
						'rgba(57, 172, 22, 0.79)',
						'rgba(17, 17, 17, 0.79)',
						'rgba(93, 91, 91, 0.79)'
					];
	var colorUser = arrayColours[Math.floor(Math.random()*arrayColours.length)];

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

	//getting the quote via ajax
	$.ajax({
		url: 'js/vendor/quotes.min.json',
		type: 'GET',
		contentType: 'application/json',
		success: function (data) {
			var phrase = data[Math.floor(Math.random() * data.length)];

			$('#quote').text(phrase.quote);
			$('#author').text(phrase.author);
		},
		error: function(data) {
			console.log(data);
		}
	});


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
		var data = {
			message: $message.val(),
			color: colorUser 
		};
		socket.emit('chat message', data);
		$message.val('');
		$message.focus();
		return false;
	});

	//recive client message from the server and show it on browser
	socket.on('chat message', function(data){
		$('#messages').append(
			'<li class="animated fadeInUp pure-g">'+ 
				'<div class="user pure-u-1 pure-u-md-1-5">'+
					'<span ' + ' style="border-bottom: 1px solid '+ data.colorUser +';">'+
						data.username+
					'</span>' +
					'<div class="time">' +
						'<span data-livestamp="'+  Math.round(+new Date()/1000) + '"></span>' + 
					'</div>'+
				'</div>'+
				'<div class="pure-u-1 pure-u-md-4-5">'+ 
					'<div class="message"' + 'style="background:'+ data.colorUser + ';">' +
						'<div class="arrow-left" ' + 'style="border-right:10px solid '+ data.colorUser + ';"></div>'+
						data.msg +
					'</div>'+
				'</div>'+ 	
			'</li>'
		);

		setTimeout(updateScrollBar(), 10);
	});

	//show message when new user is online
	socket.on('show newUser', function(data){

		var element = $('<li>')
						.text(data.username + ' is online  ' + '[ '+ moment().format('HH:mm') +' ]')
						.addClass('text-center new-user animated fadeInUp');

		element.prepend($('<i>').addClass('fa fa-user-plus'));

		$('#messages').append(element);
		updateScrollBar();
	});

	//show message when an user left the chat
	socket.on('user offline', function(data){

		var element = $('<li>')
				.text(data.username + ' left the chat  ' + '[ '+ moment().format('HH:mm') +' ]')
				.addClass('text-center user-offline animated fadeInUp');

		element.prepend($('<i>').addClass('fa fa-user-times'));

		$('#messages').append(element);
		updateScrollBar();
	});

	socket.on('users counter', function(data) {
		$('#usersCount').html('Online: ' + '<strong>' + data.usersCount + '</strong>' + ' Users');
	});
});