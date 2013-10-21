Demo = function(titleElement, canvasParent){
	this.title = titleElement;
	this.canvasParent = canvasParent;
	this.current = -1;
	
	this.initilize();

}

Demo.prototype.play = function() {
	window.setInterval( (function(demo){ return function(){demo.choose();};})(this), 4*1000);
	this.choose();
};

Demo.prototype.choose = function() {
	if (this.lastControl != undefined && this.lastControl != null){
		this.lastControl.destroy();
	}

	if (this.canvas != undefined && this.canvas != null){
		delete this.canvas;
	}

	this.current = this.current + 1;
	if (this.current >= this.demos.length){
		this.current = 0;
	}

	this.canvasParent.html("");
	var d = this.demos[this.current];
	canvas = $('<canvas class="excent demoCanvas" width="'+d.width+'" height="'+d.height+'"></canvas>').appendTo(this.canvasParent);
	var t = canvas.cDash(d).data("dbDashboard");
	if (typeof(t.setValue) == 'function'){
		t.setValue(20+80*Math.random());
	}
	this.title.text(d.title);

};




Demo.prototype.initilize = function(titleElement, canvas) {

	this.demos = [
		{type: "dial180", theme:"chocolate", orientation:"W", title:"Dial 180 West (default theme)", width:180, height: 180},
		{type: "dial360", theme:"blue", orientation:" ", title:"Dial 360 (blue theme)", width:180, height: 180},
		{type: "dial180", theme:"metro", orientation:"N", title:"Dial 180 North (metro theme)", width:180, height: 180},
		{type: "marquee", theme:"metro", orientation:"", title:"Marquee (metro theme)", width:180, height: 180, message:"Hello world! "},
		{type: "dial180", theme:"chocolate", orientation:"S", title:"Dial 180 South (chocolate)", width:180, height: 180},
		{type: "dial180", theme:"dark", orientation:"E", title:"Dial 180 East (dark theme)", width:180, height: 180},
		{type: "slider",  theme:"metro",  orientation:"", title:"Slider (metro theme)", width:220, height: 60},
	];
};