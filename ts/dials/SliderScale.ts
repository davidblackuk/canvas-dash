

module DbDashboards.Dials {

    export class SliderScale {

        scaleBandX1: number;
        scaleBandY1: number;
        scaleBandX2: number;
        scaleBandY2: number;

        scaleInnerEdge: number;
        scaleOuterEdge: number;
        majorTickSpacing: number;
        minorTickSpacing: number;
        scaleY: number;

        private options: ScaleOptions;
        constructor(private dial:DialBase) {
            this.options = dial.options.scale;

        }

        addLayer(ctx: CanvasRenderingContext2D) {
            this.getMetrics();

            this.drawMajorTicks(ctx);
            this.drawScaleBand(ctx);
            this.drawScaleValues(ctx);

        }


        drawMinorTicks(ctx:CanvasRenderingContext2D, step: number) {


            for (var min = 0; min < this.options.minorTicks.count; min++) {


                switch (this.dial.options.orientation) {
                    case DialBase.North:
                        var start = this.scaleBandX1 + (this.majorTickSpacing*step);
                        var x1 = start + (this.minorTickSpacing*min);
                        var y1 = this.scaleBandY1;
                        var x2 = x1;
                        var y2 = y1 + this.options.minorTicks.length  + this.options.majorTicks.width ;
                        break;
                    case DialBase.South:
                        var start = this.scaleBandX1 + (this.majorTickSpacing*step);
                        var x1 = start + (this.minorTickSpacing*min);
                        var y1 = this.scaleBandY1;
                        var x2 = x1;
                        var y2 = y1 - (this.options.minorTicks.length + this.options.majorTicks.width);
                        break;
                    case DialBase.West:
                        var start = this.scaleBandY1 + (this.majorTickSpacing*step);
                        var x1 = this.scaleBandX1;
                        var y1 = start + (this.minorTickSpacing*min);
                        var x2 = this.scaleBandX1 + this.options.minorTicks.length + this.options.majorTicks.width;
                        var y2 = y1;

                        break;
                    case DialBase.East:
                        var start = this.scaleBandY1 + (this.majorTickSpacing*step);
                        var x1 = this.scaleBandX1;
                        var y1 = start + (this.minorTickSpacing*min);
                        var x2 = this.scaleBandX1 - (this.options.minorTicks.length+this.options.majorTicks.width);
                        var y2 = y1;
                        break;
                }



                ctx.beginPath();
                ctx.strokeStyle = this.options.minorTicks.strokeStyle;
                ctx.lineWidth = this.options.minorTicks.width;
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.closePath();
                ctx.stroke();
            }
        }


        /**
         * draws the major tick lines for the dial
         * @param target jQuery target to render to
         * @param metrics the metrics for the dial
         */
        drawMajorTicks(ctx: CanvasRenderingContext2D) {


            for (var maj = 0; maj < this.options.majorTicks.count; maj++) {


                switch (this.dial.options.orientation) {
                    case DialBase.North:
                        var x1 = this.scaleBandX1 + (this.majorTickSpacing*maj);
                        var y1 = this.scaleBandY1;
                        var x2 = x1;
                        var y2 = y1 + this.options.majorTicks.length + this.options.width;
                        break;
                    case DialBase.South:
                        var x1 = this.scaleBandX1 + (this.majorTickSpacing*maj);
                        var y1 = this.scaleBandY1;
                        var x2 = x1;
                        var y2 = y1 - (this.options.majorTicks.length + this.options.width);
                        break;
                    case DialBase.West:
                        var x1 = this.scaleBandX1;
                        var y1 = this.scaleBandY1 + (this.majorTickSpacing*maj);
                        var x2 = this.scaleBandX1 + this.options.majorTicks.length+ this.options.width;
                        var y2 = y1;

                        break;
                    case DialBase.East:
                        var x1 = this.scaleBandX1;
                        var y1 = this.scaleBandY1 + (this.majorTickSpacing*maj);
                        var x2 = this.scaleBandX1 - (this.options.majorTicks.length + + this.options.width);
                        var y2 = y1;
                        break;
                }



                // we draw minor tick ahead of the current major tick, so omit this step for the closing tick
                //
                if (maj < this.options.majorTicks.count - 1) {
                    this.drawMinorTicks(ctx, maj);
                }
                ctx.beginPath();
                ctx.strokeStyle = this.options.majorTicks.strokeStyle;
                ctx.lineWidth = this.options.majorTicks.width;
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.closePath();
                ctx.stroke();
            }

        }

        drawScaleValues(ctx: CanvasRenderingContext2D) {
            ctx.save();
            ctx.font = this.options.font.pixelSize +"px "+ this.options.font.family;
            ctx.fillStyle = this.options.font.fillStyle;
            ctx.strokeStyle = this.options.font.strokeStyle;
            ctx.lineWidth = 1;
            var x,y = 0;


            ctx.textAlign = "center";

            for (var maj = 0; maj < this.options.majorTicks.count; maj++) {
                var stepValue = ((this.dial.options.value.max - this.dial.options.value.min)/ (this.options.majorTicks.count-1))*maj;
                var txt = $.number(stepValue+this.dial.options.value.min, this.options.decimalPlaces);
                var r = 0;
                switch (this.dial.options.orientation) {
                    case DialBase.North:
                        x = this.options.sideMargin+ (this.majorTickSpacing*maj);
                        y = this.scaleY + this.options.width  + this.options.margin + this.options.majorTicks.length +  this.options.font.pixelSize/2;
                        break;
                    case DialBase.South:
                        x = this.options.sideMargin+ (this.majorTickSpacing*maj) ;
                        y = this.dial.options.height - (this.scaleY + this.options.width  + this.options.margin + this.options.majorTicks.length - 3 );
                        break;
                    case DialBase.East:
                        x = this.dial.options.width - (this.scaleY + this.options.width  + this.options.margin + this.options.majorTicks.length +  this.options.font.pixelSize/2);
                        y = this.options.sideMargin+ (this.majorTickSpacing*maj) ;
                        r = Math.PI/2;
                        break;
                    case DialBase.West:
                        x = (this.scaleY + this.options.width  + this.options.margin + this.options.majorTicks.length )+  this.options.font.pixelSize/2;
                        y = this.options.sideMargin+ (this.majorTickSpacing*maj) ;
                        r = -Math.PI/2;
                        break;

                }
                ctx.save();
                ctx.translate(x,y);
                ctx.rotate(r);
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





        getMetrics() {
            this.scaleBandX1 = 0;
            this.scaleBandX2 = 0;
            this.scaleBandY1 = 0;
            this.scaleBandY2 = 0;

            this.scaleY = this.dial.options.bezel.margin + this.dial.options.bezel.width+ this.options.margin + (this.options.width );

            switch (this.dial.options.orientation) {
                case DialBase.North:
                    this.scaleBandX1 = this.options.sideMargin;
                    this.scaleBandY1 = this.dial.options.bezel.margin + this.dial.options.bezel.width+ this.options.margin + (this.options.width );
                    this.scaleBandX2 = this.dial.options.width - this.options.sideMargin;
                    this.scaleBandY2 = this.scaleBandY1;
                    this.majorTickSpacing = (this.scaleBandX2 - this.scaleBandX1) / (this.options.majorTicks.count-1);
                    break;
                case DialBase.South:
                    this.scaleBandX1 = this.options.sideMargin;
                    this.scaleBandY1 = this.dial.options.height - (this.dial.options.bezel.margin + this.dial.options.bezel.width+ this.options.margin + (this.options.width ));
                    this.scaleBandX2 = this.dial.options.width - this.options.sideMargin;
                    this.scaleBandY2 = this.scaleBandY1;
                    this.majorTickSpacing = (this.scaleBandX2 - this.scaleBandX1) / (this.options.majorTicks.count-1);
                    break;
                case DialBase.West:
                    this.scaleBandX1 = (this.dial.options.bezel.margin + this.dial.options.bezel.width+ this.options.margin + (this.options.width ));
                    this.scaleBandY1 = this.options.sideMargin;
                    this.scaleBandX2 = this.scaleBandX1;
                    this.scaleBandY2 = this.dial.options.height - this.options.sideMargin;
                    this.majorTickSpacing = (this.scaleBandY2 - this.scaleBandY1) / (this.options.majorTicks.count-1);
                    break;
                case DialBase.East:
                    this.scaleBandX1 = this.dial.options.width - (this.dial.options.bezel.margin + this.dial.options.bezel.width+ this.options.margin + (this.options.width ));
                    this.scaleBandY1 = this.options.sideMargin;
                    this.scaleBandX2 = this.scaleBandX1;
                    this.scaleBandY2 = this.dial.options.height - this.options.sideMargin;
                    this.majorTickSpacing = (this.scaleBandY2 - this.scaleBandY1) / (this.options.majorTicks.count-1);
                    break;
            }



            this.scaleInnerEdge = this.options.sideMargin + this.scaleY;
            this.scaleOuterEdge = this.dial.options.prv.effectiveWidth - this.scaleInnerEdge;
//            this.majorTickSpacing = (this.scaleOuterEdge-this.scaleInnerEdge)/(this.options.majorTicks.count-1);
            this.minorTickSpacing = this.majorTickSpacing / this.options.minorTicks.count;
        }
    }

}

