
module DbDashboards.Dials {

    export class DialNeedleTriangle extends DialNeedle {

        constructor(dial: DialBase) {
            super(dial);
        }

        _renderNeedle(ctx: CanvasRenderingContext2D, x: number, y:number ) {
            var hw = this.dial.options.needle.width / 2 - (this.dial.options.needle.strokeWidth / 2);
            var nt = this.dial.options.bezel.margin + this.dial.options.bezel.width / 2 + this.dial.options.needle.margin;
            var needleLength = this.dial.options.prv.needleLength - nt;

            ctx.moveTo(x, y);
            ctx.beginPath();

            ctx.lineTo(x - hw, y);
            ctx.lineTo(x, y - needleLength);
            ctx.lineTo(x + hw, y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

    }

}

