const TEMPLATE_PATH = ""

$(document).ready(function()
{
	//chargement des pages header et footer (probleme google chrome)
	$("#block-footer").load(TEMPLATE_PATH+'footer.html');
	$("#block-header").load(TEMPLATE_PATH+'header.html');

	$(document).ready(function() {
		$('.js-scrollTo').on('click', function() { 
			var page = $(this).attr('href'); 
			var speed = 750; 
			$('html, body').animate( { scrollTop: $(page).offset().top }, speed );
			return false;
		});
	});
});