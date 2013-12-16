

module DbDashboards.Dials {

    export class SliderScale extends ScaleBase {

        scaleBandX1: number;
        scaleBandY1: number;
        scaleBandX2: number;
        scaleBandY2: number;

        scaleInnerEdge: number;
        scaleOuterEdge: number;
        majorTickSpacing: number;
        minorTickSpacing: number;
        scaleY: number;

        public options: ScaleOptions;

        constructor(dialOptions: DialOptions, context: CanvasRenderingContext2D) {
            super(dialOptions, context);
            this.options = dialOptions.scale;

            this.scaleY = this.dialOptions.bezel.margin + this.dialOptions.bezel.width + this.options.margin + (this.options.width);
            this.scaleInnerEdge = this.options.sideMargin + this.scaleY;
            this.scaleOuterEdge = this.dialOptions.prv.effectiveWidth - this.scaleInnerEdge;
         

        }

        render() {
            

            this.drawMajorTicks();
            this.drawScaleBand(this.context);
            this.drawScaleValues(this.context);

        }



        drawMinorTicks(step: number) {
            for (var min = 0; min < this.options.minorTicks.count; min++) {
                var line = this.getMinorTickLine(step, min);
                this.drawTickLine(line, this.options.minorTicks); 
            }
        }




        /**
         * draws the major tick lines for the dial
         * @param target jQuery target to render to
         * @param metrics the metrics for the dial
         */
        drawMajorTicks() {
            for (var maj = 0; maj < this.options.majorTicks.count; maj++) {
                var line = this.getMajorTickLine(maj);
                // we draw minor tick ahead of the current major tick, so omit this step for the closing tick
                if (maj < this.options.majorTicks.count - 1) {
                    this.drawMinorTicks(maj);
                }
                this.drawTickLine(line, this.options.majorTicks);               
            }
        }

        drawScaleValues(ctx: CanvasRenderingContext2D) {
            ctx.save();
            ctx.font = this.options.font.pixelSize +"px "+ this.options.font.family;
            ctx.fillStyle = this.options.font.fillStyle;
            ctx.strokeStyle = this.options.font.strokeStyle;
            ctx.lineWidth = 1;
   
            ctx.textAlign = "center";

            for (var maj = 0; maj < this.options.majorTicks.count; maj++) {
                var stepValue = ((this.dialOptions.value.max - this.dialOptions.value.min)/ (this.options.majorTicks.count-1))*maj;
                var txt = $.number(stepValue+this.dialOptions.value.min, this.options.decimalPlaces);

                var at = this.getPointFoprScaleNumber(maj);

                ctx.save();
                ctx.translate(at.x,at.y);
                ctx.rotate(at.r);
                ctx.fillText(txt, 0,0);
                ctx.restore();
            }
            ctx.restore();
        }



        /**
         * draw the outer scale band
         * @param ctx
         * @param metrics
         */
        drawScaleBand(ctx: CanvasRenderingContext2D) {
            ctx.beginPath();
            ctx.strokeStyle = this.options.strokeStyle;
            ctx.lineWidth = this.options.width;
            ctx.moveTo(this.scaleBandX1, this.scaleBandY1);
            ctx.lineTo(this.scaleBandX2, this.scaleBandY2);
            ctx.stroke();
            ctx.closePath();
        }





      

        


      /**
       * calculate the start and end points of a major tick line for this dial and orientation
      */
        getMajorTickLine(step: number): Line {
            throw Error("must be implemented in derived class")
        }

        /**
         * calculate the start and end points of a minor tick line for this dial and orientation
        */
        getMinorTickLine(step: number, increment: number): Line {
            throw Error("must be implemented in derived class")
        }

        /**
         * gets the point at which the text for a major tick value should be rendered
         */
        getPointFoprScaleNumber(maj: number): TranslationAndRotation {
            throw Error("must be implemented in derived class")
        }

    }

}

