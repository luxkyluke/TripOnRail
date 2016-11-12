

$(document).ready(function(){	
	// chargement de la page index
	affArticle('index');

	// parallax script
	$(document).scroll(function()	{
  		var st = $(this).scrollTop();
  		$("#headerc").css({
    		"top": (-st/4),
    		"bottom": (st/4)
  		});


      //Scroll menu
      var header_h = $('header').height();
      var nav_h = $('#menu').height();  
      
      var scrollMenu = st-header_h+nav_h;
      var navOpacity = scrollMenu/(nav_h);

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
	});


});

