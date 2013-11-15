module DbDashboards.Dials {

    export class Themulator {
        options: DialOptions;
        dial: DialBase;
        constructor(private editorDiv:JQuery, private canvas: JQuery) {
            this.initializeOptions();

        }    

        process() {
            this.dialFromOptions();
            this.initializeUI();
        }

        dialFromOptions() {
            if (this.dial != null) {
                this.dial.destroy();
            }
            this.canvas.width = this.canvas.width;
            this.dial = new Dial360E(this.options, this.canvas);
            this.dial.render();
        }

        initializeOptions() {
            this.options = <DialOptions>$.extend({}, DialBase.themes.chocolate);
        }

        initializeUI() {
            this.initializeFace(this.editorDiv);
        }

        initializeFace(list: JQuery) {
            var faceSection = this.addSection(list, "Face");
            this.addColorEditor(faceSection, "Gradient color 1", this.options.face.gradientColor1, (color) => { this.options.face.gradientColor1 = color; this.dialFromOptions();});
            this.addColorEditor(faceSection, "Gradient color 2", this.options.face.gradientColor2, (color) => { this.options.face.gradientColor2 = color; this.dialFromOptions()});
        }

        addSection(parent: JQuery, title: string) {
            $("<h2>"+title+"</h2>").appendTo(parent);
            return $("<dl/>").appendTo(parent);

        }

        addColorEditor(list: JQuery, title: string, value: string, callback:(color:string) => void) {
            $("<dt>" + title + "</dt>").appendTo(list);
            var tb = $("<input type='text'/>").appendTo(list);
            tb.val(value);
            tb.change(function (e) { callback($(this).val()); });
        }

        


    }

}