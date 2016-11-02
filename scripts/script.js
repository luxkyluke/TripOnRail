

$(document).ready(function(){	
	// chargement des pages header et footer
	load_page("index", "THE RAILWAY CHRONICLES");


	// parallax script

	$(document).scroll(function()	{
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