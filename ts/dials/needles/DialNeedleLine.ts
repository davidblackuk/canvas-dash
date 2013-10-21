
module DbDashboards.Dials {

    export class DialNeedleLine extends DialNeedle {

        constructor(dial: DialBase) {
            super(dial);
        }

        _renderNeedle(ctx: CanvasRenderingContext2D, x:number, y:number ) {
            var hw = this.dial.options.needle.width / 2 - (this.dial.options.needle.strokeWidth / 2);
            var nt = this.dial.options.bezel.margin + this.dial.options.bezel.width / 2 + this.dial.options.needle.margin;
            var needleLength = this.dial.options.prv.needleLength - nt;
            ctx.fillRect(x - hw, y - needleLength, hw * 2, needleLength);
        }

    }

}

