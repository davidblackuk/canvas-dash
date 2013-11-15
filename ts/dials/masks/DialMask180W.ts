

module DbDashboards.Dials {

    export class DialMask180W extends DialMask {
        constructor(dial: DialBase) {
            super(dial);

        }

        apply(ctx: CanvasRenderingContext2D) {
            ctx.beginPath();
            ctx.moveTo(this._w, 0);
            ctx.lineTo(this._w, this._h);
            ctx.lineTo(this._w - this.dial.options.baseRunOutSize, this._h);
            ctx.arc(this._w - this.dial.options.baseRunOutSize, this._h / 2, this._h / 2, Math.PI / 2, 3 * Math.PI / 2, false);
            ctx.lineTo(this._w, 0);
            ctx.closePath();
            ctx.clip();
        }

    }

}