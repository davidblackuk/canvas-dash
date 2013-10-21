
module DbDashboards.Dials {

    export class DialNeedleCircleArrow extends DialNeedle {
        private hw: number;
        public needleLength: number;

        constructor(dial: DialBase) {
            super(dial);
            this.hw = dial.options.needle.width / 2 - (dial.options.needle.strokeWidth / 2);
            var nt = dial.options.bezel.margin + dial.options.bezel.width / 2 + dial.options.needle.margin;
            this.needleLength = dial.options.prv.needleLength - nt;

        }

        _renderNeedle(ctx: CanvasRenderingContext2D, x: number, y: number) {
            //ctx.fillRect(x - hw, y - needleLength, hw * 2, needleLength);

            ctx.beginPath();
            this.arrow(ctx, x, y - this.needleLength);
            ctx.lineTo(x, y);
            this.circle(ctx, x, y );
            ctx.stroke();

        }

        private circle(ctx: CanvasRenderingContext2D, x: number, y: number) {
            ctx.arc(x, y, this.dial.options.needle.width, 0, Math.PI*2);
        }

        private arrow(ctx: CanvasRenderingContext2D, x: number, y: number) {
            var size = this.dial.options.needle.width;
            ctx.lineWidth = this.dial.options.needle.width;
            ctx.strokeStyle = this.dial.options.needle.fillStyle;


            ctx.moveTo(x - size, y + size * 2);
            ctx.lineTo(x, y);
            ctx.lineTo(x + size, y + size * 2);
            ctx.moveTo(x, y);
        }


    }

}

