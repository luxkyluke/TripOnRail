

$(document).ready(function(){	
	// chargement de la page index
	load_template_page("index", "The Railway Chronicales", function(){});


	// parallax script

	$(document).scroll(function()	{
  		var st = $(this).scrollTop();
  		// $("#header").css({
    // 		"background-position-y": (-$('#header').height()/2 -st/80)
  		// })
  		$("#headerc").css({
    		"top": (-st/4),
    		"bottom": (st/4)
  		});
      // $("#footerc").css({
      //   "bottom": (-st/4),
      //   "top": (st/4)
      // });
	});


});