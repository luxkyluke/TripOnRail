 const TEMPLATE_PATH = "templates/"
 var articles;
 var experiences = {};


 function basic_load(_callback){
 	var done = 3;
	
 	$("footer").load(TEMPLATE_PATH+'footer.html', function(){
		console.log("load footer OK");
		--done;
	});

	var title = $("header").attr("data-title");
	$("header").load(TEMPLATE_PATH+'header.html', function(){
		$("#title_logo").append(title);
		console.log("load header OK");
		--done;
	});
	

	$("nav").load(TEMPLATE_PATH+'nav.html', function()	{
		$('.js-scrollTo').on('click', function() { 
		var page = $(this).attr('href'); 
		var speed = 750; 
		$('html, body').animate( { scrollTop: $(page).offset().top }, speed );
			return false;
		});
		console.log("load nav OK");
		--done;
		if(done == 0)
			_callback();
	});

	
	//alert("OK");
}

 function load_template_page(page, title, _callback){
    	document.title = title;
    	var file = TEMPLATE_PATH+page+'.html';
	    $('content').load(file, function(){
	    	basic_load(function(){
		    	console.log("bacic load OK");
		    	_callback();
	    	});
			
	    	window.history.pushState({"page":page, "pageTitle":title},"", "");
	    });
	} 


window.onpopstate = function(e){
    if(e.state){
        $('content').load(TEMPLATE_PATH+e.state.page+'.html', function(){
    		basic_load();
    	});
        document.title = e.state.pageTitle;
    }
};

function affArticle(name){
	switch(name){
		case "test":
			load_template_page("article", "article", function(){
				document.getElementById("nuits_desc").innerHTML="4 Nuits";
		    	document.getElementById("logo_type").src = "img/logos/foret.png";
		    	console.log(document.getElementById("header"));
		    	document.getElementById("header").style.backgroundImage = "url('img/background_article.jpg')";
			});
			break;
		default :
			break;
	}
}
