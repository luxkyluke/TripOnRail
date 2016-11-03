 const TEMPLATE_PATH = "templates/"


 function basic_load(){
	$("footer").load(TEMPLATE_PATH+'footer.html');
	var title = $("header").attr("data-title");

	
	$("header").load(TEMPLATE_PATH+'header.html', function(){
		$("#title_logo").append(title);
	});
	

	$("nav").load(TEMPLATE_PATH+'nav.html', function()	{
		$('.js-scrollTo').on('click', function() { 
		var page = $(this).attr('href'); 
		var speed = 750; 
		$('html, body').animate( { scrollTop: $(page).offset().top }, speed );
			return false;
		});
	});
}

 function load_page(page, title){
    	document.title = title;
    	var file = TEMPLATE_PATH+page+'.html';
	    $('content').load(file, function(){
	    	basic_load();
	    	//alert("chargement " + file);
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
	//myscript.123.js;
	switch(name){
		case "test":
			
			load_page("article", "article");
			break;
		default :
			break;
	}
}
