const TEMPLATE_PATH = "templates/"

$(document).ready(function()
{

	// chargement des pages header et footer

	$("footer").load(TEMPLATE_PATH+'footer.html');
	var title = $("header").attr("data-title");
	$("#home").load(TEMPLATE_PATH+'header_home.html', function(){
		$("#title_logo").append(title);
	});
	$("nav").load(TEMPLATE_PATH+'nav.html', function()
	{
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