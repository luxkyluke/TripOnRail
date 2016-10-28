const TEMPLATE_PATH = "templates/"

$(document).ready(function()
{
	// chargement des pages header et footer (probleme google chrome)

	//$("#block-footer").load(TEMPLATE_PATH+'footer.html');
	$("header").load(TEMPLATE_PATH+'header.html');

	// smooth scroll menu

	$(document).ready(function() {
		$('.js-scrollTo').on('click', function() { 
			var page = $(this).attr('href'); 
			var speed = 750; 
			$('html, body').animate( { scrollTop: $(page).offset().top }, speed );
			return false;
		});
	});

	// parallax script

	$(document).scroll(function() 
	{
  		var st = $(this).scrollTop();
  		$("#header").css({
    		"background-position-y": (-st/80)
  		})
  		$("#headerc").css({
    		"top": (-st/4),
    		"bottom": (st/4)
  		})
	});

});