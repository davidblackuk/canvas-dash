
module DbDashboards.Marquees {

    export interface MarqueeOptions{
        message: string;
        ledSize:number;
        ledMargin:number;
        backgroundFillStyle: string;
        ledOnFillStyle: string;
        ledOffFillStyle: string;
        ledShape: string;
        showFPS: boolean;
        fps: number;
        speed: number;
    }

    export class LedMarquee extends DbDashboards.Common.Dashboard {
        // requested Frames per second

        private paused: boolean = false;
        private finished: boolean = false;
        private intervalId: any;
        private onScreenContext: CanvasRenderingContext2D;
        private backBuffer: CanvasRenderingContext2D;
        private rackStep: number;
        private currentCharacter: any;
        private nextColumn: number;
        private characters: Characters;
        private currentStringPos;
        private options: MarqueeOptions;
        private frames: number;
        private start: Date;
        private fps: number = 0;
        private lastFrameTime: number;
        private content: string;
        private defaults: MarqueeOptions = {
            message: "Hey you need to supply a message to show!",
            ledSize: 2,
            ledMargin: 1,
            ledShape: "square",
            backgroundFillStyle:"#000",
            ledOffFillStyle:"#500",
            ledOnFillStyle:"#f00",
            showFPS: false,
            fps: 30,
            speed: 2
        };

        getThemeFromOptions(options: any, themes: any) {
            var name = options.theme.trim();
            if (typeof name == "string") {
                for (var t in themes) {
                    console.log("["+t+"]" +"|"+name+"|");
                    if (t == name) {
                        return themes[name];
                    }
                }
            }
            return LedMarquee.themes.chocolate;
        }

        constructor(  public userOptions, public target: JQuery ){

            super();
            this.lastFrameTime = 0;

            var theme = this.getThemeFromOptions(userOptions, LedMarquee.themes);

            this.options = <MarqueeOptions>$.extend({}, this.defaults, theme, userOptions);

            this.content = this.options.message;


            this.onScreenContext = (<any>this.target[0]).getContext("2d");
            this.backBuffer = this.createLayerContext(this.onScreenContext,0, 0);
            this.fillBackBuffer();
            this.characters = new Characters();
            this.currentStringPos = -1;
            this.setNextCharacter();
        }

        render() {
            this.start = new Date();
           this.intervalId = window.setInterval((function(marquee: LedMarquee){ return function() {
                if (!marquee.paused && !marquee.finished){

                    marquee.update();
                    marquee.draw();
                    marquee.updateFps();
                } else if (marquee.finished){
                    window.clearInterval(marquee.intervalId);
                }
            }})(this), 1000/this.options.fps);


        }

        updateFps(){
            var now = new Date();
            var span = (now.getTime()- this.start.getTime());


            if (span > 1000){
                this.fps = this.frames;
                this.frames = 0;
                this.start = now;
            }
            if (this.options.showFPS){
                this.onScreenContext.font = "Verdana 6px";
                this.onScreenContext.strokeStyle = "white";
                this.onScreenContext.strokeText(""+(this.fps|0), 2, 8);
            }
        }


        destroyInternal(){
            this.paused = true;
            this.finished = true;
            window.clearInterval(this.intervalId);
            this.backBuffer = null;
            this.onScreenContext = null;
            this.options = null;
        }



        /**
         * render the current led image to the onscreen canvas
         */
        draw(){

            // BLIT the back buffer scrolling one led + padding increment
            this.backBuffer.drawImage(this.backBuffer.canvas, -(this.options.ledSize + this.options.ledMargin + 1), 0);

            var x = this.backBuffer.canvas.width - (this.options.ledSize + this.options.ledMargin + 1);

            // add new led column to the row
            for (var i=0; i< 8; i++) {
                var mask = ( 1 << i )| 0;
                var isOn = ((this.nextColumn | 0 ) & mask) == mask;
                this.drawLed(x, i, isOn);
            }
            this.drawLed(x, -1, false);



            // render the back buffer to the screen
            this.onScreenContext.drawImage(this.backBuffer.canvas, 0, 0);




        }

        fillBackBuffer(){
            var start = this.backBuffer.canvas.width - (this.options.ledSize + this.options.ledMargin);
            for (var x = start; x >= 0; x -= (this.options.ledMargin + this.options.ledSize)){
                for (var i=0; i< 8; i++) {
                    this.drawLed(x, i, false);
                }
                this.drawLed(x, -1, false);
            }
        }

        drawLed(canvasX:number, ledRow: number, on: boolean){
            var y = (7-ledRow) * (this.options.ledSize + this.options.ledMargin);





            this.backBuffer.fillStyle = this.options.backgroundFillStyle;
            this.backBuffer.fillRect(canvasX, y, this.options.ledSize+this.options.ledMargin, this.options.ledSize+this.options.ledMargin);


            this.backBuffer.fillStyle = on ? this.options.ledOnFillStyle : this.options.ledOffFillStyle;


            if (this.options.ledShape == "square") {
                this.backBuffer.fillRect(canvasX, y, this.options.ledSize, this.options.ledSize)
            } else {

                this.backBuffer.beginPath();
                this.backBuffer.lineWidth = 0;
                this.backBuffer.arc(canvasX + this.options.ledSize/2,
                            y + this.options.ledSize/2, (this.options.ledSize-1)/2, 0, 2* Math.PI, false);
                this.backBuffer.closePath();
                this.backBuffer.fill();

            }
        }

        /**
         * rack the text and prepare for any new character
         */
        update(){
            this.frames++;
            this.rackStep++;
            this.nextColumn = this.currentCharacter[this.rackStep];
            if (this.rackStep >= this.currentCharacter.length){
                this.setNextCharacter();
            }
        }

        setNextCharacter(){
            this.currentStringPos++;
            this.currentCharacter = this.characters.getCharacter(this.content[this.currentStringPos]);
            if (this.currentCharacter == undefined){
                // character not found
                this.currentCharacter = this.characters.getCharacter("*");
            }
            this.rackStep = -1;
            if (this.content.length-1 <=this.currentStringPos){
                this.currentStringPos = -1;
            }
        }





        public static themes: DbDashboards.Common.Themes  = {
            dark:  {

                backgroundFillStyle:"#000",
                ledOffFillStyle:"#555",
                ledOnFillStyle:"#ddd"
            },
            blue: {

                backgroundFillStyle:"#002",
                ledOffFillStyle:"#009",
                ledOnFillStyle:"#cbcbf5"
            },
            chocolate: {
                backgroundFillStyle:"#4A2506",
                ledOffFillStyle:"#7A3E0C",
                ledOnFillStyle:"#F7CDAB"
            },
            metro: {
                backgroundFillStyle:"#2881E3",
                ledOffFillStyle:"#2881E3",
                ledOnFillStyle: "#FFFFFF",

            },
            paper: {
                backgroundFillStyle: "#F5F1DF",
                ledOffFillStyle: "#999999",
                ledOnFillStyle: "#000",

            }
            
        };

    }
}