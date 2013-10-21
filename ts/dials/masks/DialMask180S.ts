

module DbDashboards.Dials  {

    export class DialMask180S extends DialMask{
       constructor(dial: DialBase) {
            super(dial);

        }

        apply(ctx: CanvasRenderingContext2D) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, this.dial.options.baseRunOutSize);
            ctx.arc(this._w / 2, this.dial.options.baseRunOutSize, this._w / 2, Math.PI, 0, true);
            ctx.lineTo(this._w, 0);
            ctx.lineTo(0, 0);
            ctx.closePath();
            ctx.clip();
        }

    }

}