

module DbDashboards.Dials {

    export class DialMask180E extends DialMask{
         constructor(dial: DialBase) {
            super(dial);
        }

        apply(ctx: CanvasRenderingContext2D) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(this.dial.options.baseRunOutSize, 0);
            ctx.arc(this.dial.options.baseRunOutSize, this._h / 2, this._h / 2, 3 * Math.PI / 2, Math.PI / 2, false);
            ctx.lineTo(0, this._h);
            ctx.lineTo(0, 0);
            ctx.closePath();
            ctx.clip();
        }

    }

}