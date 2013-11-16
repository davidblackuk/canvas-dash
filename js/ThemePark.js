var ThemePark = function(editorDiv, canvas){
	this.editorDiv = editorDiv;
	this.canvas = canvas;
	this.initializeOptions();
	this.nextId = 1;
}

ThemePark.prototype.initializeOptions = function() {
	this.options = $.extend(true, {}, DbDashboards.Dials.DialBase.defaults, DbDashboards.Dials.DialBase.themes.chocolate);

};

ThemePark.prototype.process = function() {
	this.dialFromOptions();
	this.initializeUI();
};


ThemePark.prototype.dialFromOptions=function(){
	if (this.dial != null) {
        this.dial.destroy();
    }
    this.canvas.width = this.canvas.width;
    this.dial = new DbDashboards.Dials.Dial360E(this.options, this.canvas);
    this.dial.render();
};



ThemePark.prototype.initializeUI = function() {
    this.initializeFace(this.editorDiv);
    this.initializeBezel(this.editorDiv);
    this.initializeScale(this.editorDiv);
    this.initializeNeedle(this.editorDiv);
    this.initializeValue(this.editorDiv);
    this.initializeGlass(this.editorDiv);
};



ThemePark.prototype.initializeFace = function(list) {
	var _that = this;
    var faceSection = this.addSection(list, "Face");

    this.addColorEditor(faceSection, "Color 1: ", this.options.face.gradientColor1, function(color){ _that.options.face.gradientColor1 = color; _that.dialFromOptions();});
    this.addColorEditor(faceSection, "color 2: ", this.options.face.gradientColor2, function(color){ _that.options.face.gradientColor2 = color; _that.dialFromOptions();});
};


ThemePark.prototype.initializeBezel = function(list) {
	var _that = this;
    var section = this.addSection(list, "Bezel");
    this.addBooleanEditor(section, "Visible", this.options.bezel.visible, function(visible){ _that.options.bezel.visible = visible; _that.dialFromOptions();});
    $("<br/>").appendTo(section);
    this.addNumericEditor(section, "Margin", this.options.bezel.margin, function(num){ _that.options.bezel.margin = num; _that.dialFromOptions();});
    this.addNumericEditor(section, "Width", this.options.bezel.width, function(num){ _that.options.bezel.width = num; _that.dialFromOptions();});
    this.addColorEditor(section, "Color", this.options.bezel.strokeStyle, function(color){ _that.options.bezel.strokeStyle = color; _that.dialFromOptions();});

};


ThemePark.prototype.initializeScale = function(list) {
	var _that = this;
    var section = this.addSection(list, "Scale");
    this.addNumericEditor(section, "Margin", this.options.scale.margin, function(num){ _that.options.scale.margin = num; _that.dialFromOptions();});
    this.addNumericEditor(section, "Width", this.options.scale.width, function(num){ _that.options.scale.width = num; _that.dialFromOptions();});
    this.addColorEditor(section, "Color", this.options.scale.strokeStyle, function(color){ _that.options.scale.strokeStyle = color; _that.dialFromOptions();});
    $("<br/>").appendTo(section);
 	this.addNumericEditor(section, "Decimals", this.options.scale.decimalPlaces, function(num){ _that.options.scale.decimalPlaces = num; _that.dialFromOptions();});
 	this.addNumericEditor(section, "Side margin", this.options.scale.sideMargin, function(num){ _that.options.scale.sideMargin = num; _that.dialFromOptions();});
 	this.addFontEditor(section, this.options.scale.font);
 	this.addTickEditor(section, this.options.scale.majorTicks, "Major");
 	this.addTickEditor(section, this.options.scale.minorTicks, "Minor");

};


ThemePark.prototype.initializeNeedle = function(list) {
	var _that = this;
    var section = this.addSection(list, "Needle");
	this.addDropDownEditor(section, "Shape", this.options.needle.style, 
    	[
    	{name: "Triangle", value:"triangle"},
    	{name: "Arrow", value:"arrow"},
    	{name: "Line", value:"line"},
    	{name: "Dart", value:"dart"},
    	{name: "Dot", value:"dot"},
    	{name: "Circle arrow", value:"circleArrow"}

    	], 
    	function(s){ _that.options.needle.style = s; _that.dialFromOptions();});
	$("<br/>").appendTo(section);
  	
   	this.addNumericEditor(section, "Margin", this.options.needle.margin, function(num){ _that.options.needle.margin = num; _that.dialFromOptions();});
   	this.addNumericEditor(section, "Width", this.options.needle.width, function(num){ _that.options.needle.width = num; _that.dialFromOptions();});
    this.addColorEditor(section, "Color ", this.options.needle.fillStyle, function(color){ _that.options.needle.fillStyle = color; _that.dialFromOptions();});
    
     section = this.addSection(section, "Shadow");

  	this.addNumericEditor(section, "X", this.options.needle.shadowX, function(num){ _that.options.needle.shadowX = num; _that.dialFromOptions();});
   	this.addNumericEditor(section, "Y", this.options.needle.shadowY, function(num){ _that.options.needle.shadowY = num; _that.dialFromOptions();});
  	this.addNumericEditor(section, "Blur", this.options.needle.shadowBlur, function(num){ _that.options.needle.shadowBlur = num; _that.dialFromOptions();});
    this.addColorEditor(section, "Color ", this.options.needle.shadowColor, function(color){ _that.options.needle.shadowColor = color; _that.dialFromOptions();});
 	 
};


ThemePark.prototype.initializeValue = function(list) {
	var _that = this;
    var section = this.addSection(list, "Value");
  	this.addNumericEditor(section, "Margin", this.options.value.margin, function(num){ _that.options.value.margin = num; _that.dialFromOptions();});
  	this.addNumericEditor(section, "Decimals", this.options.value.decimalPlaces, function(num){ _that.options.value.decimalPlaces = num; _that.dialFromOptions();});
  	this.addFontEditor(section, this.options.value.font);

};


ThemePark.prototype.initializeGlass = function(list) {
	var _that = this;
    var section = this.addSection(list, "Glass");
    this.addBooleanEditor(section, "Visible", this.options.glass.visible, function(visible){ _that.options.glass.visible = visible; _that.dialFromOptions();});
    $("<br/>").appendTo(section);
    this.addDropDownEditor(section, "Shape", this.options.glass.shape, 
    	[{name: "In out", value:"inOut"},{name: "Out", value:"out"}], 
    	function(s){ _that.options.glass.shape = s; _that.dialFromOptions();});
    

};



ThemePark.prototype.addSection=function(parent, title) {
    var fs =$("<fieldset class='themeParkSection'/>").appendTo(parent);
    var legend = $("<legend>"+title+"</legend>").appendTo(fs);
    if (parent.is("fieldset")){
    	fs.removeClass("themeParkSection");
    	fs.addClass("themeParkSubSection");
    }
    return fs;

};

ThemePark.prototype.addColorEditor=function(list, title, value, callback) {
	var id = this.getNextId();
    $("<label class='field' for='"+id+"'>" + title + "</label>").appendTo(list);
    var tb = $("<input type='color' class='colorPickers' id='"+id+"'/>").appendTo(list);
    tb.val(value);
    tb.change(function (e) { callback($(this).val()); });
};

ThemePark.prototype.addNumericEditor=function(list, title, value, callback) {
	var id = this.getNextId();
	$("<label class='field' for='"+id+"'>" + title + "</label>").appendTo(list);

    var tb = $("<input type='number' class='numericPickers' id='"+id+"' />").appendTo(list);
    tb.val(value);
    tb.change(function (e) { 
    	callback(parseFloat($(this).val())); 
    });
};


ThemePark.prototype.addTextEditor=function(list, title, value, callback) {
	var id = this.getNextId();
	$("<label class='field' for='"+id+"'>" + title + "</label>").appendTo(list);

    var tb = $("<input type='text' class='numericPickers' id='"+id+"' />").appendTo(list);
    tb.val(value);
    tb.change(function (e) { 
    	callback($(this).val()); 
    });
};




ThemePark.prototype.addBooleanEditor=function(list, title, value, callback) {
    var tb = $("<input type='checkbox' class='boolPickers'>"+title+"</input>").appendTo(list);
    tb.attr("checked",value);
    tb.change(function (e) { 
    	var value = this.checked;
    	callback(value); 
    });
};

ThemePark.prototype.addDropDownEditor=function(list, title, value, values, callback) {
	var html = "<select>";
	for (var i=0; i<values.length; i++) {
		var selected = values[i].value == value ? "selected='selected' " : ""; 
		html += "<option value='"+values[i].value+"' "+selected+" >"+values[i].name+"</option>"
	}
	html+="</select>";

    var dd = $(html).appendTo(list);

    dd.change(function (e) { 
    	var value = this.value;
    	callback(value); 
    });
};

ThemePark.prototype.addFontEditor = function(parent, options) {
	var _that = this;
	var section = this.addSection(parent, "Font")
   	this.addTextEditor(section, "Family", options.family, function(txt){ options.family  = txt; _that.dialFromOptions();});
  	this.addNumericEditor(section, "Pixel size", options.pixelSize, function(num){ options.pixelSize = num; _that.dialFromOptions();});
    this.addColorEditor(section, "Color ", options.fillStyle, function(color){ options.fillStyle = color; _that.dialFromOptions();});


}

ThemePark.prototype.addTickEditor = function(parent, options, title) {
	var _that = this;
	var section = this.addSection(parent, title + " ticks")
   
  	this.addNumericEditor(section, "Count", options.count, function(num){ options.count = num; _that.dialFromOptions();});
  	this.addNumericEditor(section, "Width", options.width, function(num){ options.width = num; _that.dialFromOptions();});
  	this.addNumericEditor(section, "Length", options.length, function(num){ options.length = num; _that.dialFromOptions();});
    this.addColorEditor(section, "Color ", options.strokeStyle, function(color){ options.strokeStyle = color; _that.dialFromOptions();});


}


ThemePark.prototype.getNextId = function() {
	this.nextId++;
	return "id_"+this.nextId;
};








