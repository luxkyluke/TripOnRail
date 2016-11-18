 const TEMPLATE_PATH = "templates/"
 var articles;
 var nav_current;
 var articles = [
 	"karunda scenic railway"

 ];


 function basic_load(page, _callback){
 	var done = 3;
	
 	$("footer").load(TEMPLATE_PATH+'footer.html', function(){
		console.log("load footer "+page+" OK");
		--done;
	});
 	if(page != "destinations"){
		var title = $("header").attr("data-title");
		$("header").load(TEMPLATE_PATH+'header.html', function(){
			$("#title_logo").append(title);
			console.log("load header "+page+" OK");
			--done;
		});
	}
	else{--done;}
	

	$("nav").load(TEMPLATE_PATH+'nav.html', function()	{
		$('.js-scrollTo').on('click', function() { 
		var ref = $(this).attr('href'); 
		var speed = 750; 
		$('html, body').animate( { scrollTop: $(ref).offset().top }, speed );
			return false;
		});
		$('#menu a').click(function(){
			/*$("#menu a.current").removeClass('current');
			nav_current = $(this);*/
		})
		console.log("load nav "+page+" OK");
		--done;
		if(done == 0){
			loadImgsBackGrounds(page);
			_callback();
		}

	});
		
	//alert("OK");
}

 function load_template_page(page, title, _callback, refresh){
	document.title = title;
	var file = TEMPLATE_PATH+page+'.html';
    $('content').load(file, function(){	    	
		basic_load(page, function(){
		    console.log("bacic load "+page+" OK");
		    window.history.pushState({"page":page, "pageTitle":title},"", "");
	    	$(document).scrollTop(0);
	    	_callback();
	    });
	   	if(refresh !== undefined)
	   		return false;
    });
} 


window.onpopstate = function(e){
    if(e.state){
        $('content').load(TEMPLATE_PATH+e.state.page+'.html', function(){
    		affArticle(e.state.page);

    	});
        document.title = e.state.pageTitle;
    }
};

function updateCurrent(){
	if(nav_current != null){
		$(nav_current).addClass('current');
	}
}

function affArticle(name){
	switch(name){
		case "article":
			load_template_page("article", "article", function(){
				nav_current = '#nav_article';
				updateCurrent();
			});
			break;

		case "index":
			load_template_page("index", "The Railway Chronicales", function(){
				nav_current = '#nav_index';
				updateCurrent();
			});
			break;

		case "experiences":
			load_template_page("experiences", "Experiences", function(){
				experienceAnim();
				$("#cat_decouverte a li").first().click();
				nav_current = '#nav_experiences';
				updateCurrent();
			});
			break;

		case "dest":
			load_template_page("destinations", "Destinations", function(){
				nav_current = '#nav_destinations';
				updateCurrent();
				initMap();

			});
			break;

		case "about":
			if(nav_current === '#nav_index' || nav_current === '#nav_contact'
					|| nav_current === '#ourteam'){
				$('html, body').animate({
					scrollTop: $("#ourteam").offset().top-50
				}, 2000, false);
				$(nav_current).removeClass('current');
				nav_current='#nav_about';
				updateCurrent();
			}
			else{
				load_template_page("index", "The Railway Chronicales", function(){
					nav_current='#nav_about';
					updateCurrent();
					$('html, body').animate({
						scrollTop: $("#ourteam").offset().top-50
					}, 1500, false);
				});
			}
			break;

		case "contact":
			if(nav_current === '#nav_index' || nav_current === '#nav_about'
					|| nav_current === '#nav_contact'){
				$('html, body').animate({
					scrollTop: $("#contactus").offset().top-50
				}, 2000, false);
				$(nav_current).removeClass('current');
				nav_current= '#nav_contact';
				updateCurrent();
			}
			else{
				load_template_page("index", "The Railway Chronicales", function(){
					nav_current= '#nav_contact';
					updateCurrent();
					$('html, body').animate({
						scrollTop: $("#contactus").offset().top-50
					}, 1500);
				}, false);
			}

			break;

		default :
			console.log("ERROR, page non reconnue.");
			break;
	}
	
	//alert(nav_current);
}



function loadImgsBackGrounds(page){
   	switch(page){
		case "article":
			document.getElementById("header").style.backgroundImage = "url('img/articles/"+$("#page").data("id")+"/background.jpg')";;
			break;

		case "experiences":
			document.getElementById("header").style.backgroundImage = "url('img/experiences/background.jpg')";
			document.getElementById("header").style.backgroundPosition = "center";
			$(".bg").each(function(){
				var src = $(this).data('src');
				if(src != undefined){
					$(this).css('background-image', 'url('+src+')');
				}
			});
			break;

		default :
			break;
	}
}


function experienceAnim(){

	$("#cat_decouverte a li").click(function(){
		//maj du current
		$("#cat_decouverte a li.current").removeClass('current');
		$(this).addClass('current');


		//tri des expériences
		var idExp = $(this).data('exp');
		$("#article_conteneur a").each(function(){
			$(this).css('display', 'none');
		});


		$(".exp_"+idExp).each(function(){
			$(this).css('display', 'inline-block');
		});

		var srcLogoBlanc = $(this).find(".middle").children('img').prop('src');
		var srcLogoNoir = String (srcLogoBlanc.split('_')[0]+".png");

		$('#main_logo_cat').attr('src', srcLogoNoir);

		var titreExp = $(this).find(".middle").children('h2').text();
		console.log(titreExp);
		$('#top_title').find('p').html(titreExp);

		return false;
	});
}
