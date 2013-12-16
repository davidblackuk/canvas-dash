

module DbDashboards.Dials {

    export class ThermometerScale extends ScaleBase {


        public options: ScaleOptions;
        metrics: ThermometerMetrics;
        needleCenterTop: Point;
        needleCenterBottom: Point;
     
     
        constructor(dialOptions: DialOptions, context: CanvasRenderingContext2D) {
            super(dialOptions, context);
            this.options = dialOptions.scale;
            this.metrics = ThermometerNeedle.calculateMetrics(dialOptions);
            this.needleCenterTop = new Point(this.metrics.x + this.metrics.w / 2, this.metrics.y);
            this.needleCenterBottom = new Point(this.metrics.x + this.metrics.w / 2, this.metrics.tubeBaseY);
        }

        render() {
            this.drawScaleBand();
            this.drawMajorTicks();
        }




        /**
         * draw the outer scale band
         * @param ctx
         * @param metrics
         */
        drawScaleBand() {
            this.context.beginPath();
            this.context.strokeStyle = this.options.strokeStyle;
            this.context.lineWidth = this.options.width;

            var deltaX = this.metrics.w/2 + this.options.margin + this.options.width / 2;
            this.drawMirrorScaleBand(deltaX);
            this.drawMirrorScaleBand(-deltaX);

            this.context.stroke();
            this.context.closePath();
        }

        drawMirrorScaleBand(offset: number) {
            this.drawLine(new Line(this.needleCenterTop.x + offset, this.needleCenterTop.y, this.needleCenterBottom.x + offset, this.needleCenterBottom.y));
        }


        drawMajorTicks() {
            var deltaX = this.metrics.w / 2 + this.options.margin + this.options.width / 2;
            var majorTickSpacing = (this.metrics.tubeBaseY - this.metrics.y) / (this.options.majorTicks.count-1);
            var minorTickGap = (majorTickSpacing / (this.options.minorTicks.count));
            for (var maj = 0; maj < this.options.majorTicks.count; maj++) {
                var step = maj / (this.options.majorTicks.count-1);
                var pos = new Point(deltaX, this.metrics.tubeBaseY - ((this.metrics.tubeBaseY - this.metrics.y)*step));
                // we draw minor tick ahead of the current major tick, so omit this step for the closing tick
                if (maj < this.options.majorTicks.count - 1) {
                    this.drawMinorTicks(pos, minorTickGap);
                }
                this.drawMirrorTickLine(pos, 1, this.options.majorTicks);
                this.drawMirrorTickLine(pos, -1, this.options.majorTicks);
            }
        }

        drawMirrorTickLine(pos: Point, sense: number, tickOpts: TickOptions) {           
            var startX = this.needleCenterTop.x + (pos.x * sense);
            this.drawTickLine(new Line(startX, pos.y, startX+ (tickOpts.length*sense), pos.y), tickOpts);
        }


        drawMinorTicks( majorPos: Point, gap: number) {
            for (var min = 0; min < this.options.minorTicks.count+1; min++) {
                var pos = { x: majorPos.x+ this.options.majorTicks.width, y: majorPos.y - (min * gap) };
                this.drawMirrorTickLine(pos, 1, this.options.minorTicks); 
                this.drawMirrorTickLine(pos, -1, this.options.minorTicks); 
            }
        }

    }

}

