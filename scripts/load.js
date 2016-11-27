 const TEMPLATE_PATH = "templates/"
 var articles;
 var nav_current;
 var articles = [
 	"karunda scenic railway"

 ];

///!\ NE PAS CHANGER DE PLACE LES CONTINENTS EXISTANTS
// 	NE PAS AJOUTER DE NOUVEAU CONTINENT
var continents =[
	"Europe", 	//id 1
	"Asie",		//id 2
	"Oceanie",	//id 3
	"Amérique"	//id 4
];

//ordre important se réferer aux 
//index des pays de l'onglet gauche (id = i+1)
//avec i indice du tableau pays
///!\ NE PAS CHANGER DE PLACE LES PAYS EXISTANT
//AJOUTER LES NOUVEAUX PAYS A LA FIN DU TABLEAU
var pays = [
	"France", 	//id 1
	"Italy",  	//id 2
	"Russie", 	//id 3
	"Australie"	//id 4
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
		/*$('.js-scrollTo').on('click', function() { 
		var ref = $(this).attr('href'); 
		var endPos = $(ref).offset().top;
		var beginPos = $(this).scrollTop();
		var speed = abs(beginPos/endPos)*10000; 
		console.log(speed);
		$('html, body').animate( { scrollTop: $(ref).offset().top }, speed );
			return false;
		});
*/		
		$('.burger-menu').on('click', function(e) {
			e.preventDefault();
		  	$(this).toggleClass("burger-menu--opened");
		  	$(this).toggleClass("burger-menu--closed");	
		  	$("#menu").toggleClass("burger");
		});
		$('#burger').click(function(e){
			e.preventDefault();
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
		case "levoyagedesacha":
			load_template_page("levoyagedesacha", "Le Voyage de Sacha", function()
			{
				nav_current = '#nav_sacha';
				updateCurrent();
			})
			break;

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
				clickCatExpAnim($("#cat_decouverte a li").first(), false);
				nav_current = '#nav_experiences';
				updateCurrent();
			});
			break;

		case "dest":
			load_template_page("destinations", "Destinations", function(){
				nav_current = '#nav_destinations';
				updateCurrent();
				initMap();
				destinationsLoad()
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
					}, 2000, false);
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

		case "destinations":
			$(".bg").each(function(){
				var src = $(this).data('src');
				if(src != undefined){
					$(this).css('background-image', 'url('+src+')');
				}
			});
			break;

		case "levoyagedesacha":
			$(".bg").each(function()
			{
				var src = $(this).data('src');
				if (src != undefined)
				{
					$(this).css('background-image', 'url('+src+')');
				}
			})

		default :
			break;
	}
}

function clickCatExpAnim(current, scroll){
	//maj du current
	$("#cat_decouverte a li.current").removeClass('current');
	current.addClass('current');


	//tri des expériences
	var idExp = current.data('exp');
	$("#article_conteneur a").each(function(){
		$(this).css('display', 'none');
	});	


	$(".exp_"+idExp).each(function(){
		$(this).css('display', 'inline-block');
	});

	var srcLogoBlanc = current.find(".middle").children('img').prop('src');
	var srcLogoNoir = String (srcLogoBlanc.split('_')[0]+".png");

	$('#main_logo_cat').attr('src', srcLogoNoir);

	var titreExp = current.find(".middle").children('h2').text();
	$('#top_title').find('p').html(titreExp);

	if(scroll == false)
		return false;
	$('html, body').animate({
        scrollTop: $("#page").offset().top-50
    }, 1000);

	return false;
}

function experienceAnim(){
	$("#cat_decouverte a li").click(function(){
		clickCatExpAnim($(this), true);
		return false;
	});
}

function destinationsLoad(){
	//initialisation des indicateurs de nombre 
	//le nb d'exp par région
	var nbExp = $('.article_bloc').size();
	$('.inject h2 a span').text(nbExp);
	$('#continent_0 span').text(nbExp);

	var exp = " Expérience"
	if(parseInt(nbExp)>1)
		exp +="s";

	$('#region_title').html("Tout <span class='count'>"+ nbExp + exp +"</span>");
		

	var nbExpByContinents = [];
	for(var i=0; i < continents.length; i++){
		var nb = $(".continent_"+String(i+1)).size()
		nbExpByContinents[i] = nb;
		$('#continent_'+String(i+1)+' span').text(nb);
	}

	//le nb d'exp par pays
	var nbExpByPays = [];
	for(var i=0; i < pays.length; i++){
		var nb = $(".country_"+String(i+1)).size();
		nbExpByPays[i] = nb;
		$('#pays_'+String(i+1)+' a span').text(nb);
	}
	//on charge les pays correspondant au click sur un continent
	$('.id_continent').click(function(){
		//changement du curseur de selection
		$(".id_continent.selected").removeClass('selected');
		$(this).addClass('selected');
		resetSelectedCountry();

		var idContinent = $(this).data('id');

		//On copie les infos données par l'onglet continent
		var text = 	$(this).text();
		text = text.split(" ");
		var nom = text[0];
		var nb = text[1];

		var exp = " Expérience"
		if(parseInt(nb)>1)
			exp +="s";

		$('#region_title').html(nom + "<span class='count'>"+ nb + exp +"</span>");
		$('.inject h2 a').html(nom + "<span class='count'>"+nb+"</span>");
		
		if(idContinent == 0){
			$(".article_bloc").css("display", "inline-block");
			$('.inject ul li').css("display", "block");
		}
		else{
			//on efface tous les blocs articles
			$(".article_bloc").css("display", "none");
			
			//on efface tous les pays dans la fenetre de gauche
			$('.inject ul li').css("display", "none");
			

			$(".continent_"+idContinent).each(function(){
				var idPays = $(this).data('pays');
				$('#pays_'+idPays).css('display', 'block');
				//console.log($(' li').find("data-id='"+idPays+"'"));
			
				$(this).css('display', 'inline-block');
			});

		}
		$('html, body').animate({
	        scrollTop: $("#page").offset().top-50
	    }, 1000);
		return false;
	});

	//clique sur pays dans l'onglet gauche
	$('.inject a').click(function(){
		var idPays = $(this).data('id');

		//on changer le current curseur

		resetSelectedCountry(this);

		//on change le titre et le nbExp
		var text = 	$(this).text();
		text = text.split(" ");
		var nom = text[0];
		var nb = text[1];

		var exp = " Expérience"
		if(parseInt(nb)>1)
			exp +="s";

		$('#region_title').html(nom + "<span class='count'>"+nb+exp+"</span>");


		//on efface tous les blocs articles
		$(".article_bloc").css("display", "none");
		$(".country_"+idPays).each(function(){
			$(this).css('display', 'inline-block');
		});

		$('html, body').animate({
	        scrollTop: $("#page").offset().top-50
	    }, 1000);
		return false;
	});
}

function resetSelectedCountry(selector){
	$('.inject a.selected').removeClass('selected');
	if(selector != undefined);
		$(selector).addClass('selected');	
	$('.inject .items').first().addClass('selected');
}

function markerClickEvent(id){
	if(id == undefined)
		return false;
	$("#pays_"+id + " a").click();

}