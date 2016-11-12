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
    		basic_load(e.state.page, function(){});
    	});
        document.title = e.state.pageTitle;
    }
};

function affArticle(name){
	switch(name){
		case "test":
			load_template_page("article", "article", function(){});
			break;

		case "home":
			load_template_page("index", "The Railway Chronicales", function(){});
			break;
		case "exp":
			load_template_page("experiences", "Experiences", function(){});
			break;
		default :
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
			break;

		default :
			break;
	}
}

