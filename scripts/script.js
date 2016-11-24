

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


      //Scroll menu degradé
      var header_h = $('header').height();
      var nav_h = $('#menu').height();  
      
      var scrollMenu = st-header_h+nav_h+0;
      var navOpacity = scrollMenu/(nav_h+0);


      if(navOpacity >1)
        navOpacity=1;
      else if(navOpacity <0)
        navOpacity=0;

      var navBackColor = 'rgba(255, 255, 255,' + navOpacity + ')';
      var defaultLiColor = $('#menu li').css("color");
      var menuLiColorHeader = '#000';
      var menuLiColorHover = "#dc6a1a";
      var menuLiColorPage = "#ffffff";

      

      if(st-header_h+nav_h > 0){
        //$('#menu').css('border-bottom', '3px solid black');
        /*$('#menu li').css('color', menuLiColorHeader);
        $('#menu a.current > li').css('border-color', menuLiColorHeader);
        $('#menu a').hover(function(){
          $(this).children('li').css('color', menuLiColorHover);
        }, function(){
          $(this).children('li').css('color', menuLiColorHeader);
        });*/
        $('#menu').addClass('dark');
      }
      else{
        //$('#menu').css('border-bottom', 'none');
        /*$('#menu li').css('color', menuLiColorPage);
        $('#menu a.current > li').css('border-color', menuLiColorPage);
        $('#menu a').hover(function(){
          $(this).children('li').css('color', menuLiColorHover);
        }, function(){
          $(this).children('li').css('color', menuLiColorPage);
        });*/
        $('#menu').removeClass('dark');
      }
      
      //$('#menu').css('background-color', navBackColor);
	});


});
