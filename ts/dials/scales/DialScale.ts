
module DbDashboards.Dials {

    export class DialScale extends ScaleBase {

        public static piOver180:number = Math.PI / 180;

        constructor(dialOptions:DialOptions,  context: CanvasRenderingContext2D) {
            super(dialOptions, context);
        }

        render() {
            var c = this.getMetrics();

           this.drawMajorTicks(this.context, c);
            this.drawScaleBand(this.context, c);
            this.drawScaleValues(this.context, c);

        }

        /**
         * draws the minor ticks for a single major tick division
         * @param target jquery canvas target
         * @param metrics dial metrics
         * @param angle the start angle of the major tick
         */
            drawMinorTicks(ctx:CanvasRenderingContext2D, metrics:any, angle) {
            ctx.beginPath();
            ctx.strokeStyle = this.dialOptions.scale.minorTicks.strokeStyle;
            ctx.lineWidth = this.dialOptions.scale.minorTicks.width;

            for (var min = 0; min < this.dialOptions.scale.minorTicks.count + 1; min++) {

                var majStep = metrics.step;
                var minStep = majStep / (this.dialOptions.scale.minorTicks.count + 1);
                var stepAngle = angle + min * minStep;
                var minorOuter = this.pointOnCircle(metrics.x, metrics.y, metrics.w + this.dialOptions.scale.width / 2, stepAngle);
                var minorInner = this.pointOnCircle(metrics.x, metrics.y, metrics.w - (this.dialOptions.scale.width / 2) - this.dialOptions.scale.minorTicks.length, stepAngle);

                ctx.moveTo(minorInner.x, minorInner.y);
                ctx.lineTo(minorOuter.x, minorOuter.y);
            }
            ctx.closePath();
            ctx.stroke();
        }


        /**
         * draws the major tick lines for the dial
         * @param target jQuery target to render to
         * @param metrics the metrics for the dial
         */
        drawMajorTicks(ctx: CanvasRenderingContext2D, metrics:any) {

            for (var maj = 0; maj < this.dialOptions.scale.majorTicks.count; maj++) {

                var angle = (metrics.startAngle + (maj * metrics.step));
                var majorOuter = this.pointOnCircle(metrics.x, metrics.y, metrics.w + this.dialOptions.scale.width / 2, angle);
                var majorInner = this.pointOnCircle(metrics.x, metrics.y, metrics.w - (this.dialOptions.scale.width / 2) - this.dialOptions.scale.majorTicks.length, angle);

                // we draw minor tick ahead of the current major tick, so omit this step for the closing tick
                //
                if (maj < this.dialOptions.scale.majorTicks.count - 1) {
                   this.drawMinorTicks(ctx, metrics, angle);
                }
                ctx.beginPath();
                ctx.strokeStyle = this.dialOptions.scale.majorTicks.strokeStyle;
                ctx.lineWidth = this.dialOptions.scale.majorTicks.width;
                ctx.moveTo(majorInner.x, majorInner.y);
                ctx.lineTo(majorOuter.x, majorOuter.y);
                ctx.closePath();
                ctx.stroke();
            }

        }

        drawScaleValues(ctx: CanvasRenderingContext2D, metrics:any) {
            ctx.font = this.dialOptions.scale.font.pixelSize +"px "+ this.dialOptions.scale.font.family;


            for (var maj = 0; maj < this.dialOptions.scale.majorTicks.count; maj++) {

                var angle = (metrics.startAngle + (maj * metrics.step));

                var fontRadius = metrics.w - (this.dialOptions.scale.width / 2);
                fontRadius -=  this.dialOptions.scale.majorTicks.length;
                fontRadius -=  this.dialOptions.scale.font.pixelSize;

                var centerText = this.pointOnCircle(metrics.x, metrics.y, fontRadius  , angle);


                ctx.fillStyle = this.dialOptions.scale.font.fillStyle;
                ctx.strokeStyle = this.dialOptions.scale.font.strokeStyle;
                var stepValue = ((this.dialOptions.value.max - this.dialOptions.value.min)/ (this.dialOptions.scale.majorTicks.count-1))*maj;



                var txt = $.number(stepValue+this.dialOptions.value.min, this.dialOptions.scale.decimalPlaces);



                ctx.lineWidth = 1;

                angle = (3*Math.PI)/2 - (Math.PI - angle);



                ctx.save();
                ctx.textAlign = "center";
                ctx.translate(centerText.x, centerText.y);
                ctx.rotate(angle);
                ctx.fillText(txt, 0,0);

                ctx.restore();


            }

        }



        /**
         * draw the outer scale band
         * @param ctx
         * @param metrics
         */
            drawScaleBand(ctx: CanvasRenderingContext2D, metrics:any) {
            ctx.beginPath();



            ctx.strokeStyle = this.dialOptions.scale.strokeStyle;
            ctx.lineWidth = this.dialOptions.scale.width;
            ctx.arc(metrics.x, metrics.y, metrics.w, metrics.startAngle, metrics.endAngle,false);
            ctx.stroke();
            ctx.closePath();
        }


        /**
         * Calculates the x,y coordinates of a point on the circumference
         * a circle.
         * @param cx the origin of the circle's x coordinate
         * @param cy the origin of the circle's y coordinate
         * @param radius of the circle
         * @param angle (in degrees of the point around the circle)
         * @returns {{x: number, y: number}}
         */
        public pointOnCircle(cx:number, cy:number, radius, angle) {
            return {
                x: cx + radius * Math.cos(angle),
                y: cy + radius * Math.sin(angle)
            }
        }


        getMetrics() {
            var bezelInnerEdge = this.dialOptions.bezel.margin + (this.dialOptions.bezel.width);
            var scaleInnerEdge = this.dialOptions.scale.margin + (this.dialOptions.scale.width / 2);
            var offset = 0;


            var c = {
                x: this.dialOptions.prv.effectiveWidth / 2,
                y: this.dialOptions.prv.effectiveHeight / 2,
                w: this.dialOptions.prv.effectiveWidth / 2 - (bezelInnerEdge + scaleInnerEdge ),
                startAngle: this.dialOptions.prv.scaleStartAngle,
                endAngle: this.dialOptions.prv.scaleEndAngle,
                step: 0,
            };

            c.step = (Math.PI*2 -(c.startAngle - c.endAngle) )/ (this.dialOptions.scale.majorTicks.count - 1);


            switch (this.dialOptions.type){
                case DialBase.Dial360:

                    break;
                case DialBase.Dial180N:
                    break;
                case DialBase.Dial180S:
                    c.y = this.dialOptions.baseRunOutSize;
                    c.step = (c.endAngle - c.startAngle )/ (this.dialOptions.scale.majorTicks.count - 1);
                    break;
                case DialBase.Dial180E:
                    c.x = this.dialOptions.prv.needleX;
                    c.y = this.dialOptions.prv.needleY;
                    break;
                case DialBase.Dial180W:
                    c.w = this.dialOptions.prv.effectiveHeight / 2 - (bezelInnerEdge + scaleInnerEdge );
                    c.step = (c.endAngle - c.startAngle )/ (this.dialOptions.scale.majorTicks.count - 1);
                    c.x = this.dialOptions.prv.needleX;
                    c.y = this.dialOptions.prv.needleY;
                    break;
            }



            return c;
        }
    }

}

