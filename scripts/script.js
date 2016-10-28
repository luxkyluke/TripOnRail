const TEMPLATE_PATH = "templates/"

$(document).ready(function()
{

	// chargement des pages header et footer (probleme google chrome)

	$("footer").load(TEMPLATE_PATH+'footer.html');
	var test =$("header").attr("data-title");
	$("header").load(TEMPLATE_PATH+'header.html', function(){
		$("#title_logo").append(test);
	});
	$("nav").load(TEMPLATE_PATH+'nav.html');
	

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