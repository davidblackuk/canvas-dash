$(function(){

	var footer = $("footer").first();
	var title = $("<br/><span>Jump to</span>").appendTo(footer);
	
	var sections = $(".jumpPoint");
	sections.each(function(){
		var name = $(this).attr("name");
		var footer = $("footer").first();
		var span = $("<span/>").appendTo(footer);
		var anchor = $('<a href="#'+name+'">'+name+'</a>').appendTo(span);

	});

	

});