$(document).on('ready', function(){
	//login form
	var $login = $('.login');

	//initialize colorbox
	$('.who-i-am').colorbox({html: 
		'<div class="about-me">
			<header class="text-center">
				<div class="_img-wrapper animated fadeInUp">
					<img src="images/min/avatar.jpg" alt="Pablo Valor Avatar">	
				</div>
			</header>
			<div class="_content">
				<div class="left-content">
					<h3>
						<span class="_badge">About me</span>
					</h3>
				</div>
				<div class="_body">
					<p>
						Hi there! My name is Pablo and I am from Buenos Aires, Argentina. I am a  
						<span class="text-line-through">web developer</span> good pizza maker and I love discover and use new technologies.
					</p>
					<p>
						So I hope you enjoy this chat. There is a lot of work there but It was worth \'cause I could learned a lot of sweeeet things!
					</p>
					<p>
						Feel free to give me some feedback if you have any question, idea, proyect or whatever.
					</p>
				</div>
				<div class="left-content">
					<h3>
						<span class="_badge">Contact</span>
					</h3>
				</div>
				<div class="_img-wrapper _body text-center">
					<div class="_animation-icon-container animated fadeInLeft">
						<span class="symbol logo dark gmail big icon-spacing">
							<a href="mailto:pablovalor89@gmail.com" target="_blank" title="E-mail">circleemail</a>
						</span>
					</div>
					
					<div class="_animation-icon-container animated fadeInUp">
						<span class="symbol logo dark skype big icon-spacing">
							<a href="skype:pablo.valor77?chat" target="_blank" title="Skype">circleskype</a>
						</span>
					</div>
					
					<div class="_animation-icon-container animated fadeInRight">
						<span class="symbol logo dark linkedin big icon-spacing">
							<a href="http://ar.linkedin.com/pub/pablo-alejandro-valor/7a/521/565" target="_blank" title="Linkedin">circlelinkedin</a>
						</span>
					</div>
				</div>	
			</div>
		</div>',
		transition: 'fade',
		speed: 500,
		fadeOut: 500,
		width: '80%',
		maxHeight: '950px',
		closeButton: true,
	});

	$('#enter-button').on('click', function(){

		//hide the 'Enter Button'
		$(this).addClass('animated fadeOutUp');
		//When the 'Enter button' animation ends, animate 'login' form
		$(this).one(
			'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
			, function(){
				$('#enter-button').css('display','none');
				$('#intro-text').removeClass('with-margin-bottom');
				$login.addClass('animated fadeIn');
				$login.show();
				$('.input-name').focus();
			});
	});
});