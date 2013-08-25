

var Editor = (function () {
    function Editor(sourceDiv, canvas) {
        this.sourceDiv = sourceDiv;
        this.canvas = canvas;
        this.context = canvas[0].getContext("2d");
    }
    Editor.InitializePage = function InitializePage() {
        var needButtons = $(".tryMe");
        var buttons = $('<div class="tryMeButton">Try Me</div>').appendTo(needButtons);
        buttons.click(function(){
            var code = $(this).closest("pre").text().replace("Try Me","");
            var t = $.url().attr('protocol') + "://" +
                    $.url().attr('host') + ":" +
                    $.url().attr('port') + 
                    "/editor/editor.html" + "?code=" +
                    encodeURIComponent(code);
           
              window.location=t; 
        });
        buttons.attr("title", "click me to try this code in an editor")
    };
    Editor.prototype.process = function () {
       // this.sourceDiv.text($.url().param('code'));
        this.editor = CodeMirror(this.sourceDiv[0], {
            mode: "javascript",
            lineNumbers: 1,
            theme: "blackboard",
            value: $.url().param('code')

        });

        $("#runButton").click((function(editor){ return function(e){
            editor.run();
        }; })(this));
    };

    Editor.prototype.run = function(){
        try {
            this.context.save();
            this.context.clearRect(-5,-5,canvas.width+10, canvas.height+10);
            new Function(this.editor.getValue())();
            this.context.restore();
        } catch(error) {
            
            console.error(error.stack || String(error));
        }
    }

    return Editor;
})();
 