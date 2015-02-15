$(document).on('ready', function(){
	//login form
	var $login = $('.login'),
		$about = $('.who-i-am h2');

	//initialize colorbox
	$about.colorbox({html:"<p>Hi there, my name is Pablo and welcome to my chat</p>"});

	$('#enter-button').on('click', function(){

		//hide the 'Enter Button'
		$(this).addClass('animated fadeOutUp');
		//When the 'Enter button' animation ends, animate 'login' form
		$(this).one(
			'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
			, function(){
				$('#enter-button').css('display','none');
				$login.addClass('animated fadeIn');
				$login.show();
				$('.input-name').focus();
			});
	});
});