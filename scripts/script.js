

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

      //console.log('st = '+st);
      var header_h = $('header').height();
      var nav_h = $('#menu').height();  
      
      var scrollMenu = st-header_h+nav_h+40;
      //console.log("scrollM = "+scol)
      var navOpacity = scrollMenu/(nav_h+40);

      if(navOpacity >1)
        navOpacity=1;
      else if(navOpacity <0)
        navOpacity=0;

      var navBackColor = 'rgba(255, 255, 255,' + navOpacity + ')';
      var defaultLiColor = $('#menu li').css("color");

      if(st-header_h+nav_h > 0){
        //$('#menu').css('border-bottom', '3px solid black');
        $('#menu li').css('color', '#000');
      }
      else{
        //$('#menu').css('border-bottom', 'none');
        $('#menu li').css('color', '#FFF');
      }
      $('#menu').css('background-color', navBackColor);
       
      //}
      //else{
        //$('#menu').css('background-color', 'transparent');
      //}
	});


});