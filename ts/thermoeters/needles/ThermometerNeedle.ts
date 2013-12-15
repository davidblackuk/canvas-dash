
module DbDashboards.Dials {

    export class ThermometerNeedle extends NeedleBase {

        private x: number;
        private y: number;
        private w: number;
        private h: number;
        private bubbleRadius: number;
        private bowlCenter: Point;
        private bowlRadius: number;
        private tubeBaseY: number;

        constructor(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            super(options, needleContext);
            this.calculateMetrics();
        }

        render(stepValue: number) {

    

            var normalized = (stepValue - this.options.value.min) / (this.options.value.max - this.options.value.min);
            this.clear();

            this.showMetrics();


            this.needleContext.rotate(this.options.prv.needleRotation);

       
            this.needleContext.fillStyle = this.options.needle.fillStyle;
            this.needleContext.strokeStyle = this.options.needle.strokeStyle;
            this.needleContext.lineWidth = this.options.needle.strokeWidth+1;


          

            this.needleContext.save();
            this.createPath();
            this.needleContext.clip(); 

      




            //  var lg = this.needleContext.createLinearGradient(0, 0, this.options.prv.effectiveWidth, this.options.prv.effectiveHeight);

            var lg = this.needleContext.createRadialGradient(this.bowlCenter.x, this.bowlCenter.y, 5, this.bowlCenter.x, this.bowlCenter.y, this.bowlRadius);
            lg.addColorStop(1, "#000");
            lg.addColorStop(0, this.options.needle.fillStyle);
            //this.needleContext.fillStyle = lg;

            this.needleContext.fillRect(this.bowlCenter.x - this.bowlRadius, this.bowlCenter.y - this.bowlRadius, this.bowlRadius * 2, this.bowlRadius*2);


            this.needleContext.restore();

            this.createPath();
            this.needleContext.stroke();

        
          
          
        }

        createPath() {

           
        
            var r = this.bubbleRadius;
      
            this.needleContext.beginPath();
            this.needleContext.moveTo(this.x, this.y + r);
            this.needleContext.lineTo(this.x, this.tubeBaseY);
            this.needleContext.arc(this.x, this.tubeBaseY + r, r, 1.5 * Math.PI, Math.PI, true);

            this.bowlCenter = new Point(this.x + this.w / 2, this.tubeBaseY + r);
            this.bowlRadius = r + this.w / 2;

            this.needleContext.arc(this.bowlCenter.x, this.bowlCenter.y, this.bowlRadius, Math.PI, 0, true);
            this.needleContext.arc(this.x + r, this.tubeBaseY + r, r, 0, 1.5 * Math.PI, true);
            this.needleContext.lineTo(this.x + this.w, this.y + r);
            this.needleContext.arc(this.x + this.w / 2, this.y + r, this.w / 2, 0, Math.PI, true);
            this.needleContext.closePath();
        }

        tween(normalizedValue: number) {
            return new Point(this.options.prv.minPoint.x + ((this.options.prv.maxPoint.x - this.options.prv.minPoint.x) * normalizedValue),
                this.options.prv.minPoint.y + ((this.options.prv.maxPoint.y - this.options.prv.minPoint.y) * normalizedValue));

        }

        calculateMetrics() {
            console.log("bm: "+ this.options.bezel.margin + ", bw: " + this.options.bezel.width + ", vm: " + this.options.value.margin + ", sm: " +  this.options.scale.margin);


            var toTop = this.options.bezel.margin * 2 + this.options.bezel.width + this.options.scale.margin;
            var maxis = Math.max(this.options.prv.effectiveHeight, this.options.prv.effectiveWidth);


        
        
            var bottomSpaceForValue = toTop+  this.options.value.margin * 2 + this.options.value.font.pixelSize/2;

            this.x= (this.options.prv.effectiveWidth / 2) - this.options.needle.width / 2;
            this.y= toTop ;
            this.w= this.options.needle.width*2;
            this.bubbleRadius= this.options.needle.width*2 ;
            this.h = maxis - (toTop + bottomSpaceForValue)
            this.tubeBaseY = this.h - this.bubbleRadius;
        }

        showMetrics() {
            var c = this.needleContext;
            c.strokeStyle = "#00dd00";
            c.strokeRect(this.x, this.y, this.w, this.h);
            c.strokeRect(0, this.y, this.options.prv.effectiveWidth, this.h);

            c.strokeStyle = "#dd00dd";
            c.strokeRect(0, this.y, this.options.prv.effectiveWidth, this.tubeBaseY - this.y);
        }

    }


}

