

module DbDashboards.Dials {

    export class DialMask180N extends DialMask{
        constructor(dial: DialBase) {
            super(dial);

        }

        apply(ctx: CanvasRenderingContext2D) {
            ctx.beginPath();
            ctx.moveTo(this._w / 2, (this._h / 2) + this.dial.options.baseRunOutSize);
            ctx.lineTo(0, (this._h / 2) + this.dial.options.baseRunOutSize);
            ctx.lineTo(0, this._h / 2);
            ctx.arc(this._w / 2, this._h / 2, this._w / 2, Math.PI, 0, false);
            ctx.lineTo(this._w, (this._h / 2) + this.dial.options.baseRunOutSize);
            ctx.closePath();
            ctx.clip();
        }

       
    }

}