$(function(){
	$(".tryMe").each(function(){
		var button = $("<a href='' class='tryMeButton'>Try me</a>");

		button.prependTo($(this));

		button.click(function(e){
			var text = $(this).parent().text().replace("Try me","");	
            var t =  "/editor?code=" + encodeURIComponent(text);
          	window.location=t; 
			return false;
		});
	});
});