

module DbDashboards.Dials {

    export class ThermometerScale extends ScaleBase {


        public options: ScaleOptions;

        constructor(dialOptions: DialOptions, context: CanvasRenderingContext2D) {
            super(dialOptions, context);
            this.options = dialOptions.scale;


        }

        render() {
            this.drawScaleBand(this.context);
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
          //  ctx.moveTo(this.scaleBandX1, this.scaleBandY1);
          //  ctx.lineTo(this.scaleBandX2, this.scaleBandY2);
            ctx.stroke();
            ctx.closePath();
        }











    }

}

