Demo = function(titleElement, canvasParent){
	this.title = titleElement;
	this.canvasParent = canvasParent;
	this.current = -1;
	
	this.initilize();

}

Demo.prototype.play = function() {
	window.setInterval( (function(demo){ return function(){demo.choose();};})(this), 3*1000);
	this.choose();
};

Demo.prototype.choose = function() {
	console.log("Choosing");
	if (this.lastControl != undefined && this.lastControl != null){
		this.fadeOutOld();
	} else {
		this.fadeInNew();
	}

	

};

Demo.prototype.fadeOutOld = function() {
	var that = this;
	this.lastControl.fadeOut(500, function() {
		that.fadeInNew();
	});
}

Demo.prototype.fadeInNew = function() {
	if (this.canvas != undefined && this.canvas != null){
		delete this.canvas;
	}

	this.current = this.current + 1;
	if (this.current >= this.demos.length){
		this.current = 0;
	}

	this.canvasParent.html("");
	
	var d = this.demos[this.current];
	var div = $('<div style="width:200px;height:200px;margin-left:auto;margin-right:auto;display:block"/>').appendTo(this.canvasParent);
	canvas = $('<canvas class="excent demoCanvas" width="'+d.width+'" height="'+d.height+'"></canvas>').appendTo(div);
	
	canvas.css("margin-top", (200 - d.height)/2);

	var t = canvas.cDash(d).data("dbDashboard");

	if (typeof(t.setValue) == 'function'){
		t.setValue(40+60*Math.random());
	}
	this.title.text(d.title);
	this.lastControl = canvas;
	canvas.css("display","none");
	canvas.fadeIn(500);
}

Demo.prototype.initilize = function(titleElement, canvas) {

	this.demos = [
		{type: "dial360", theme:"paper", orientation:"N", title:"Dial 180 West (default theme)", width:180, height: 180},
		{type: "dial180", theme:"blue", orientation:"N", title:"Dial 360 (blue theme)", width:180, height: 180},
		{type: "slider", theme:"dark", orientation:"S", title:"Slider South (dark theme)", width:180, height: 77},

		{type: "marquee", theme:"metro", orientation:"", title:"Marquee (metro theme)", width:180, height: 40, message:"Hello world! "},
		{type: "dial180", theme:"paper", orientation:"S", title:"Dial 180 South (paper theme)", width:180, height: 180},
		{type: "dial360", theme:"chocolate", orientation:"W", title:"Dial 360 (default theme)", width:180, height: 180},
		{type: "slider", styleSet:"medium", theme:"blue", orientation:"E", title:"Slider East (blue theme)", width:77, height: 180},

		{type: "marquee", theme:"dark", orientation:"", title:"Marquee (dark theme)", width:180, height: 40, message:"Hello world! "},
		{type: "dial360", theme:"metro", orientation:"S", title:"Dial 360 (metro theme)", width:180, height: 180, message:"Hello world! "},
		{type: "slider", styleSet:"medium", theme:"paper", orientation:"W", title:"Slider West (paper theme)", width:77, height: 180},
	];
};



$(function(){
	var logoLink = $(".site-logo");
	logoLink.html("");
	//var canvas = $('<canvas width="200" height="200" id="guage"/>').appendTo(logoLink);

    var demo = new Demo($("<p>"),logoLink);
    demo.play();

  $("#documentationButton").addClass("selectedPage");
        $("#d31").cDash({type: "dial360", orientation:"N", theme: "paper"});
        $("#d32").cDash({type: "dial360", orientation:"S", theme: "paper"});
        $("#d33").cDash({type: "dial360", orientation:"E", theme: "paper"});
        $("#d34").cDash({type: "dial360", orientation:"W", theme: "paper"});

        $("#d2").cDash({type: "dial180", theme: "metro"});
        $("#d3").cDash({type: "dial180", orientation:"S", theme: "metro"});
        $("#d4").cDash({type: "dial180", orientation:"E", theme: "metro"});
        $("#d5").cDash({type: "dial180", orientation:"W", theme: "metro"});

        $("#d6").cDash({type: "slider", orientation:"n",  theme: "dark"});
        $("#d7").cDash({type: "slider", orientation:"S",  theme: "dark"});
        $("#d8").cDash({type: "slider", orientation:"E",  theme: "dark"});
        $("#d9").cDash({type: "slider", orientation:"W",  theme: "dark"});

        $("#marquee").cDash({theme: "blue", type:"marquee", message:"cDash - HTML 5 Canvas dials, gauges and cool eye candy. (c) 2013 David Black and other contributors. For updates and announcements follow me on twitter (or check out the contacts page)    ****    The only thing we have to fear is fear itself. Well that and spiders, obviously :-)   ***    message repeats    ****    ",
            ledSize: 3,
            ledMargin: 1,
            ledShape: "square"
        });

        window.setInterval(animate, 2*1000);
        animate();
    });

    function animate() {
        $("#d31").data("dbDashboard").setValue(20+Math.random()*80);
        $("#d32").data("dbDashboard").setValue(20+Math.random()*80);
        $("#d33").data("dbDashboard").setValue(20+Math.random()*80);
        $("#d34").data("dbDashboard").setValue(20+Math.random()*80);

        $("#d2").data("dbDashboard").setValue(20+Math.random()*80);
        $("#d3").data("dbDashboard").setValue(20+Math.random()*80);
        $("#d4").data("dbDashboard").setValue(20+Math.random()*80);
        $("#d5").data("dbDashboard").setValue(20+Math.random()*80);
        $("#d6").data("dbDashboard").setValue(20+Math.random()*80);
        $("#d7").data("dbDashboard").setValue(20+Math.random()*80);
        $("#d8").data("dbDashboard").setValue(20+Math.random()*80);
        $("#d9").data("dbDashboard").setValue(20+Math.random()*80);

    }


    



