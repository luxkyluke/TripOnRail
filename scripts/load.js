 const TEMPLATE_PATH = "templates/"
 var articles;
 var articles = [
 	"karunda scenic railway"

 ];


 function basic_load(page, _callback){
 	var done = 3;
	
 	$("footer").load(TEMPLATE_PATH+'footer.html', function(){
		console.log("load footer "+page+" OK");
		--done;
	});

	var title = $("header").attr("data-title");
	$("header").load(TEMPLATE_PATH+'header.html', function(){
		$("#title_logo").append(title);
		console.log("load header "+page+" OK");
		--done;
	});
	

	$("nav").load(TEMPLATE_PATH+'nav.html', function()	{
		$('.js-scrollTo').on('click', function() { 
		var ref = $(this).attr('href'); 
		var speed = 750; 
		$('html, body').animate( { scrollTop: $(ref).offset().top }, speed );
			return false;
		});

		$('#menu a').click(function(){
			$("#menu a.current").removeClass('current');
			$(this).addClass('current');
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

 function load_template_page(page, title, _callback){
    	document.title = title;
    	var file = TEMPLATE_PATH+page+'.html';
	    $('content').load(file, function(){
	    	basic_load(page, function(){
		    	console.log("bacic load "+page+" OK");
		    	_callback();
	    	});
	    	window.history.pushState({"page":page, "pageTitle":title},"", "");
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

function affArticle(name){
	switch(name){
		case "article":
			load_template_page("article", "article", function(){});
			break;

		case "index":
			load_template_page("index", "The Railway Chronicales", function(){
				$("#menu a").first().addClass('current');
			});
			break;
		case "experiences":
			load_template_page("experiences", "Experiences", function(){
				experienceAnim();
				$("#cat_decouverte a li").first().click();
			});
			break;
		default :
			console.log("erreur page non reconnu !");
			break;
	}
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

		return false;

	});
}
