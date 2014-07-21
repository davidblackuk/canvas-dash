
module DbDashboards.Dials {

    export interface ThermometerMetrics {
        x: number;
        y: number;
        w: number;
        h: number;
        bubbleRadius: number;
        tubeBaseY: number;
        bowlCenter: Point;
        bowlRadius: number;
    }

    export class ThermometerNeedle extends NeedleBase {

        metrics: ThermometerMetrics;

        constructor(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            super(options, needleContext);
            this.metrics = ThermometerNeedle.calculateMetrics(options);

        }

        render(stepValue: number) {

    

            var normalized = (stepValue - this.options.value.min) / (this.options.value.max - this.options.value.min);
            this.clear();

            // this.showMetrics();
            var ty = this.metrics.h / 2; 

            this.needleContext.translate(( this.metrics.x + this.metrics.w / 2), ( ty));
            this.needleContext.rotate(this.options.prv.needleRotation);
            this.needleContext.translate(-(this.metrics.x + this.metrics.w / 2), -(ty));
            this.needleContext.translate(this.options.prv.needleX, this.options.prv.needleY);

            this.needleContext.fillStyle = "rgba(245,123,45,1)";
            this.needleContext.fillRect(0, 0, this.options.width, this.options.height);

            this.needleContext.fillStyle = this.options.needle.fillStyle;
            this.needleContext.strokeStyle = this.options.needle.strokeStyle;
            this.needleContext.lineWidth = this.options.needle.strokeWidth+1;


          

            this.needleContext.save();
            this.createPath();
            this.needleContext.clip(); 

      




            //  var lg = this.needleContext.createLinearGradient(0, 0, this.options.prv.effectiveWidth, this.options.prv.effectiveHeight);

            var lg = this.needleContext.createRadialGradient(this.metrics.bowlCenter.x, this.metrics.bowlCenter.y, 1, this.metrics.bowlCenter.x, this.metrics.bowlCenter.y, this.metrics.bowlRadius);
            lg.addColorStop(0, "#fff");
            lg.addColorStop(1, this.options.needle.fillStyle);
            this.needleContext.fillStyle = lg;

            this.needleContext.fillRect(this.metrics.bowlCenter.x - this.metrics.bowlRadius, this.metrics.bowlCenter.y - this.metrics.bowlRadius, this.metrics.bowlRadius * 2, this.metrics.bowlRadius*2);


            var heightAtMax = (-(this.metrics.tubeBaseY - this.metrics.y));
            this.needleContext.fillStyle = this.options.needle.fillStyle;
            this.needleContext.fillRect(this.metrics.x, this.metrics.tubeBaseY, this.metrics.w, normalized*heightAtMax);

          



            this.needleContext.restore();

            this.createPath();
            this.needleContext.stroke();

   
            this.needleContext.translate(-this.options.prv.needleX, -this.options.prv.needleY);

          
        }

        createPath() {

           
        
            var r = this.metrics.bubbleRadius;
            var topRadius = this.metrics.w / 2;

            this.needleContext.beginPath();
            this.needleContext.moveTo(this.metrics.x, this.metrics.y + topRadius);
            this.needleContext.lineTo(this.metrics.x, this.metrics.tubeBaseY);
            this.needleContext.arc(this.metrics.x, this.metrics.tubeBaseY + r, r, 1.5 * Math.PI, Math.PI, true);



            this.needleContext.arc(this.metrics.bowlCenter.x, this.metrics.bowlCenter.y, this.metrics.bowlRadius, Math.PI, 0, true);
            this.needleContext.arc(this.metrics.x + r, this.metrics.tubeBaseY + r, r, 0, 1.5 * Math.PI, true);
            this.needleContext.lineTo(this.metrics.x + this.metrics.w, this.metrics.y + topRadius);
            this.needleContext.arc(this.metrics.x + this.metrics.w / 2, this.metrics.y + topRadius, topRadius, 0, Math.PI, true);
            this.needleContext.closePath();
        }

        tween(normalizedValue: number) {
            return new Point(this.options.prv.minPoint.x + ((this.options.prv.maxPoint.x - this.options.prv.minPoint.x) * normalizedValue),
                this.options.prv.minPoint.y + ((this.options.prv.maxPoint.y - this.options.prv.minPoint.y) * normalizedValue));

        }

        public static calculateMetrics(options: DialOptions) {
            var toTop = options.bezel.margin * 2 + options.bezel.width + options.scale.margin;
            var maxis = Math.max(options.prv.effectiveHeight, options.prv.effectiveWidth);
            var bottomSpaceForValue = options.bezel.margin * 2 + options.bezel.width + options.value.margin + options.value.font.pixelSize;

            var mertics = {
                x: (options.prv.effectiveWidth / 2) - options.needle.width,
                y: toTop,
                w: options.needle.width * 2,
                bubbleRadius: options.needle.width * 2,
                h: maxis - (toTop + bottomSpaceForValue),
                tubeBaseY: 0,
                bowlCenter: { x: 0, y: 0 },
                bowlRadius: 0
            }
            mertics.tubeBaseY = mertics.h - mertics.bubbleRadius;

            var r = mertics.bubbleRadius;
            mertics.bowlCenter = new Point(mertics.x + mertics.w / 2, mertics.tubeBaseY + r);
            mertics.bowlRadius = r + mertics.w / 2;

            return mertics;
        }

        showMetrics() {
            
            var c = this.needleContext;
            c.strokeStyle = "#00dd00";
            c.strokeRect(this.metrics.x, this.metrics.y, this.metrics.w, this.metrics.h);
            c.strokeRect(0, this.metrics.y, this.options.prv.effectiveWidth, this.metrics.h);

            c.strokeStyle = "#dd00dd";
            c.strokeRect(0, this.metrics.y, this.options.prv.effectiveWidth, this.metrics.tubeBaseY - this.metrics.y);


            c.strokeStyle = "#006677";
            c.strokeRect( this.options.prv.effectiveWidth/2, 0, 0.5, 220);

        }

    }


}

