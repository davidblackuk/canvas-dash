/// <reference path="DialOptions.ts" />
/// <reference path="DialBase.ts" />


module DbDashboards.Dials {

    export class DialScale {

        public static piOver180:number = Math.PI / 180;

        constructor(private dial:DialBase) {

        }

        addLayer(ctx: CanvasRenderingContext2D) {
            var c = this.getMetrics();

           this.drawMajorTicks(ctx, c);
            this.drawScaleBand(ctx, c);
            this.drawScaleValues(ctx, c);

        }

        /**
         * draws the minor ticks for a single major tick division
         * @param target jquery canvas target
         * @param metrics dial metrics
         * @param angle the start angle of the major tick
         */
            drawMinorTicks(ctx:CanvasRenderingContext2D, metrics:any, angle) {
            ctx.beginPath();
            ctx.strokeStyle = this.dial.options.scale.minorTicks.strokeStyle;
            ctx.lineWidth = this.dial.options.scale.minorTicks.width;

            for (var min = 0; min < this.dial.options.scale.minorTicks.count + 1; min++) {

                var majStep = metrics.step;
                var minStep = majStep / (this.dial.options.scale.minorTicks.count + 1);
                var stepAngle = angle + min * minStep;
                var minorOuter = this.pointOnCircle(metrics.x, metrics.y, metrics.w + this.dial.options.scale.width / 2, stepAngle);
                var minorInner = this.pointOnCircle(metrics.x, metrics.y, metrics.w - (this.dial.options.scale.width / 2) - this.dial.options.scale.minorTicks.length, stepAngle);

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

            for (var maj = 0; maj < this.dial.options.scale.majorTicks.count; maj++) {

                var angle = (metrics.startAngle + (maj * metrics.step));
                var majorOuter = this.pointOnCircle(metrics.x, metrics.y, metrics.w + this.dial.options.scale.width / 2, angle);
                var majorInner = this.pointOnCircle(metrics.x, metrics.y, metrics.w - (this.dial.options.scale.width / 2) - this.dial.options.scale.majorTicks.length, angle);

                // we draw minor tick ahead of the current major tick, so omit this step for the closing tick
                //
                if (maj < this.dial.options.scale.majorTicks.count - 1) {
                   this.drawMinorTicks(ctx, metrics, angle);
                }
                ctx.beginPath();
                ctx.strokeStyle = this.dial.options.scale.majorTicks.strokeStyle;
                ctx.lineWidth = this.dial.options.scale.majorTicks.width;
                ctx.moveTo(majorInner.x, majorInner.y);
                ctx.lineTo(majorOuter.x, majorOuter.y);
                ctx.closePath();
                ctx.stroke();
            }

        }

        drawScaleValues(ctx: CanvasRenderingContext2D, metrics:any) {
            ctx.font = this.dial.options.scale.font.pixelSize +"px "+ this.dial.options.scale.font.family;


            for (var maj = 0; maj < this.dial.options.scale.majorTicks.count; maj++) {

                var angle = (metrics.startAngle + (maj * metrics.step));

                var fontRadius = metrics.w - (this.dial.options.scale.width / 2);
                fontRadius -=  this.dial.options.scale.majorTicks.length;
                fontRadius -=  this.dial.options.scale.font.pixelSize;

                var centerText = this.pointOnCircle(metrics.x, metrics.y, fontRadius  , angle);


                ctx.fillStyle = this.dial.options.scale.font.fillStyle;
                ctx.strokeStyle = this.dial.options.scale.font.strokeStyle;
                var stepValue = ((this.dial.options.value.max - this.dial.options.value.min)/ (this.dial.options.scale.majorTicks.count-1))*maj;



                var txt = $.number(stepValue+this.dial.options.value.min, this.dial.options.scale.decimalPlaces);



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



            ctx.strokeStyle = this.dial.options.scale.strokeStyle;
            ctx.lineWidth = this.dial.options.scale.width;
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
            var bezelInnerEdge = this.dial.options.bezel.margin + (this.dial.options.bezel.width);
            var scaleInnerEdge = this.dial.options.scale.margin + (this.dial.options.scale.width / 2);
            var offset = 0;


            var c = {
                x: this.dial.options.prv.effectiveWidth / 2,
                y: this.dial.options.prv.effectiveHeight / 2,
                w: this.dial.options.prv.effectiveWidth / 2 - (bezelInnerEdge + scaleInnerEdge ),
                startAngle: this.dial.options.prv.scaleStartAngle,
                endAngle: this.dial.options.prv.scaleEndAngle,
                step: 0,
            };

            c.step = (Math.PI*2 -(c.startAngle - c.endAngle) )/ (this.dial.options.scale.majorTicks.count - 1);


            switch (this.dial.options.type){
                case DialBase.Dial360:

                    break;
                case DialBase.Dial180N:
                    break;
                case DialBase.Dial180S:
                    c.y = this.dial.options.baseRunOutSize;
                    c.step = (c.endAngle - c.startAngle )/ (this.dial.options.scale.majorTicks.count - 1);
                    break;
                case DialBase.Dial180E:
                    c.x = this.dial.options.prv.needleX;
                    c.y = this.dial.options.prv.needleY;
                    break;
                case DialBase.Dial180W:
                    c.w = this.dial.options.prv.effectiveHeight / 2 - (bezelInnerEdge + scaleInnerEdge );
                    c.step = (c.endAngle - c.startAngle )/ (this.dial.options.scale.majorTicks.count - 1);
                    c.x = this.dial.options.prv.needleX;
                    c.y = this.dial.options.prv.needleY;
                    break;
            }



            return c;
        }
    }

}

