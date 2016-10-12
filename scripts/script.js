const TEMPLATE_PATH = ""

$(document).ready(function(){
	//chargement des pages header et footer (probleme google chrome)
	$("#block-footer").load(TEMPLATE_PATH+'footer.html');
	$("#block-header").load(TEMPLATE_PATH+'header.html');
});