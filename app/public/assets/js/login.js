$(document).on('ready', function(){
	//login form
	$login = $('.login');

	$('.button').on('click', function(){

		//hide the 'Enter Button'
		$(this).addClass('animated fadeOut');
		//When the 'Enter button' animation ends, animated 'login' form
		$(this).one(
			'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
			, function(){
				$('.button').css('display','none');
				$login.addClass('animated fadeIn');
				$login.show();
				$('.input-name').focus();
			});
	});
});