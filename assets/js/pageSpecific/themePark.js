




var ThemePark = function(editorDiv, previewDiv, canvas){
	this.editorDiv = editorDiv;
	this.canvas = canvas;
    this.previewDiv = previewDiv;
	this.initializeOptions();
	this.nextId = 1;
}

ThemePark.prototype.initializeOptions = function() {
	this.options = $.extend(true, {type:"Dial360", orientation:"n", x:0, y:0, width:200, height:200, theme:"paper"}, 
        DbDashboards.Dials.DialBase.defaults, DbDashboards.Dials.DialBase.themes.paper);
};

ThemePark.prototype.process = function() {
	this.dialFromOptions();
	this.initializeUI(); 
};


ThemePark.prototype.dialFromOptions=function(){
	if (this.dial != null) {
        this.dial.destroy();
    }
    this.canvas[0].width = this.canvas[0].width;

    console.log("dialFromOptions");
    console.dir(this.options);

    this.dial = this.canvas.cDash(this.options).data("dbDashboard");
};



ThemePark.prototype.initializeUI = function() {
    this.editorDiv.html("");
    this.initializeFace(this.editorDiv);
    this.initializeBezel(this.editorDiv);
    this.initializeScale(this.editorDiv);
    this.initializeNeedle(this.editorDiv);
    this.initializeValue(this.editorDiv);
    this.initializeGlass(this.editorDiv);

    this.previewDiv.html("");
    this.canvas.appendTo(this.previewDiv);

    this.initializeGeneralOptions(this.previewDiv);
  
};

ThemePark.prototype.initializeGeneralOptions = function(list) {
    var _that = this;
 
    var section = list;
   $("<br/>").appendTo(section);

    this.addDropDownEditor(section, "Dial type", this.options.theme, 
        [
            {name: "blue", value:"blue"},
            {name: "choc...", value:"chocolate"},
            {name: "dark", value:"dark"},
            {name: "metro", value:"metro"},
            {name: "paper", value:"paper"},
        ], 
        function(s){ 
            _that.setTheme(s);
            
        });

    this.addDropDownEditor(section, "Dial type", this.options.type, 
        [
            {name: "Dial 360", value:"dial360"},
            {name: "Dial 180", value:"dial180"},
            {name: "Slider", value:"slider"},
        ], 
        function(s){ _that.options.type = s; _that.setInitialDialSize();
        });
    this.addDropDownEditor(section, "Dial type", this.options.orientation, 
        [
            {name: "North", value:"n"},
            {name: "South", value:"s"},
            {name: "East", value:"e"},
            {name: "West", value:"w"},
        ], 
        function(s){ _that.options.orientation = s; _that.setInitialDialSize();
        });

   $("<br/>").appendTo(section);
    this.addNumericEditor(section, "X", this.options.x, function(num){ _that.options.x = num; _that.dialFromOptions();});
    this.addNumericEditor(section, "Y", this.options.y, function(num){ _that.options.y = num; _that.dialFromOptions();});
    $("<br/>").appendTo(section);
    this.addNumericEditor(section, "Width", this.options.width, function(num){ _that.options.width = num; _that.dialFromOptions();});
    this.addNumericEditor(section, "Height", this.options.height, function(num){ _that.options.height = num; _that.dialFromOptions();});
     
   $("<br/>").appendTo(section);
   $("<br/>").appendTo(section);
    var btn = $("<a class='btn'>Source...</btn>").appendTo(section);
    var _that = this;
    btn.click(function(){
        window.alert(JSON.stringify(_that.options));
    });
};

ThemePark.prototype.setTheme = function(theme) {

    if (window.confirm("Reset to theme: '"+theme+"' ?, all changes will be lost!")) {
        var opts = DbDashboards.Dials.DialBase.themes[theme];

        this.options = $.extend(true, {type:"Dial360", orientation:"n", x:0, y:0, width:200, height:200, theme:theme}, 
            DbDashboards.Dials.DialBase.defaults, opts);
        this.initializeUI();
        this.dialFromOptions();
        this.setInitialDialSize();
    }
}



ThemePark.prototype.setInitialDialSize = function(list) {
    var w = 200;
    var h = 200;
    if (this.options.type=="slider" || this.options.type=="thermometer"){
        h = 80;
    }
    if (this.options.orientation == "e" || this.options.orientation =="w") {
        t = w;
        w = h;
        h = t;
    }
    this.options.width = w;
    this.options.height = h;
    this.initializeUI();
    this.dialFromOptions();
};


ThemePark.prototype.initializeFace = function(list) {
	var _that = this;
    var faceSection = this.addSection(list, "Face", false);

    this.addColorEditor(faceSection, "Color 1: ", this.options.face.gradientColor1, function(color){ 
        _that.options.face.gradientColor1 = color; 
        _that.dialFromOptions();
       
    });
    this.addColorEditor(faceSection, "color 2: ", this.options.face.gradientColor2, function(color){ _that.options.face.gradientColor2 = color; _that.dialFromOptions();});
};


ThemePark.prototype.initializeBezel = function(list) {
	var _that = this;
    var section = this.addSection(list, "Bezel", true);
    this.addBooleanEditor(section, "Visible", this.options.bezel.visible, function(visible){ 
        console.log("value toggle" + visible );
        _that.options.bezel.visible = visible; 
        _that.dialFromOptions();});
    $("<br/>").appendTo(section);
    this.addNumericEditor(section, "Margin", this.options.bezel.margin, function(num){ _that.options.bezel.margin = num; _that.dialFromOptions();});
    this.addNumericEditor(section, "Width", this.options.bezel.width, function(num){ _that.options.bezel.width = num; _that.dialFromOptions();});
    this.addColorEditor(section, "Color", this.options.bezel.strokeStyle, function(color){ _that.options.bezel.strokeStyle = color; _that.dialFromOptions();});

};

ThemePark.prototype.initializeGlass = function(list) {
    var _that = this;
    var section = this.addSection(list, "Glass", true);
    this.addBooleanEditor(section, "Visible", this.options.glass.visible, 
        function(visible){ 
            _that.options.glass.visible = visible; 
            _that.dialFromOptions();
        });
    $("<br/>").appendTo(section);
    this.addDropDownEditor(section, "Shape", this.options.glass.shape, 
        [{name: "In out", value:"inOut"},{name: "Out", value:"out"}], 
        function(s){ _that.options.glass.shape = s; _that.dialFromOptions();});
    

};


ThemePark.prototype.initializeScale = function(list) {
	var _that = this;
    var section = this.addSection(list, "Scale", true);
    this.addNumericEditor(section, "Margin", this.options.scale.margin, function(num){ _that.options.scale.margin = num; _that.dialFromOptions();});
    this.addNumericEditor(section, "Width", this.options.scale.width, function(num){ _that.options.scale.width = num; _that.dialFromOptions();});
    this.addColorEditor(section, "Color", this.options.scale.strokeStyle, function(color){ _that.options.scale.strokeStyle = color; _that.dialFromOptions();});
 
 	this.addNumericEditor(section, "Decimals", this.options.scale.decimalPlaces, function(num){ _that.options.scale.decimalPlaces = num; _that.dialFromOptions();});
 	this.addNumericEditor(section, "Side margin", this.options.scale.sideMargin, function(num){ _that.options.scale.sideMargin = num; _that.dialFromOptions();});
 	this.addFontEditor(section, this.options.scale.font);
 	this.addTickEditor(section, this.options.scale.majorTicks, "Major");
 	this.addTickEditor(section, this.options.scale.minorTicks, "Minor");

};


ThemePark.prototype.initializeNeedle = function(list) {
	var _that = this;
    var section = this.addSection(list, "Needle", true);
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
    
     section = this.addSection(section, "Shadow", true);

  	this.addNumericEditor(section, "X", this.options.needle.shadowX, function(num){ _that.options.needle.shadowX = num; _that.dialFromOptions();});
   	this.addNumericEditor(section, "Y", this.options.needle.shadowY, function(num){ _that.options.needle.shadowY = num; _that.dialFromOptions();});
  	this.addNumericEditor(section, "Blur", this.options.needle.shadowBlur, function(num){ _that.options.needle.shadowBlur = num; _that.dialFromOptions();});
    this.addColorEditor(section, "Color ", this.options.needle.shadowColor, function(color){ _that.options.needle.shadowColor = color; _that.dialFromOptions();});
 	 
};


ThemePark.prototype.initializeValue = function(list) {
	var _that = this;
    var section = this.addSection(list, "Value", true);
  	this.addNumericEditor(section, "Margin", this.options.value.margin, function(num){ _that.options.value.margin = num; _that.dialFromOptions();});
  	this.addNumericEditor(section, "Decimals", this.options.value.decimalPlaces, function(num){ _that.options.value.decimalPlaces = num; _that.dialFromOptions();});
  	this.addFontEditor(section, this.options.value.font);

};





ThemePark.prototype.addSection=function(parent, title, collapsed) {
    var fs =$("<fieldset class='themeParkSection'/>").appendTo(parent);

    var pm = collapsed ? "<b>+</b>" :  "<b>-</b>";

    var legend = $("<legend style='cursor:pointer'></legend>").appendTo(fs);
    legend.html(pm+title)


    legend.click(function(e) {
        var tog = $(this).parent().find("legend").first();
        var html = tog.html();
        if (html[3] == '+') {
            html = html.replace("+", "-");
        } else {
            html = html.replace("-", "+");
        }
        tog.html(html);


        $(this).parent().find("#contents").first().toggle();
    });

    if (parent.is("fieldset")){
    	fs.removeClass("themeParkSection");
    	fs.addClass("themeParkSubSection");
    }

    var outer = $("<div  />").appendTo(fs);
    var res = $("<div  id='contents'/>").appendTo(outer);

    if (collapsed) {
        res.toggle();
    }
    return res;

};

ThemePark.prototype.addColorEditor=function(list, title, value, callback) {
	var id = this.getNextId();
    $("<label class='field' for='"+id+"'>" + title + "</label>").appendTo(list);
    var tb = $("<input class='colorPickers' id='"+id+"'/>").appendTo(list);
    tb.val(value);
    var x = tb.spectrum({
        change: function(color) {
            callback(color.toHexString());
        }
    });
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
	var section = this.addSection(parent, "Font", true)
   	this.addTextEditor(section, "Family", options.family, function(txt){ options.family  = txt; _that.dialFromOptions();});
  	this.addNumericEditor(section, "Pixel size", options.pixelSize, function(num){ options.pixelSize = num; _that.dialFromOptions();});
    this.addColorEditor(section, "Color ", options.fillStyle, function(color){ options.fillStyle = color; _that.dialFromOptions();});


}

ThemePark.prototype.addTickEditor = function(parent, options, title) {
	var _that = this;
	var section = this.addSection(parent, title + " ticks", true)
   
  	this.addNumericEditor(section, "Count", options.count, function(num){ options.count = num; _that.dialFromOptions();});
  	this.addNumericEditor(section, "Width", options.width, function(num){ options.width = num; _that.dialFromOptions();});
  	this.addNumericEditor(section, "Length", options.length, function(num){ options.length = num; _that.dialFromOptions();});
    this.addColorEditor(section, "Color ", options.strokeStyle, function(color){ options.strokeStyle = color; _that.dialFromOptions();});


}


ThemePark.prototype.getNextId = function() {
	this.nextId++;
	return "id_"+this.nextId;
};



/*
Initailize the page
*/

  $(function(){
            var editor = new ThemePark($("#themeParkLeft"), $("#themeParkRight"), $("#dashboard"));
            editor.process();
        });