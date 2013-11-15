

module DbDashboards.Dials  {

    export class DialMask360 extends DialMask{
        constructor(dial: DialBase) {
            super(dial);

        }

        apply(ctx: CanvasRenderingContext2D) {

           ctx.arc(this._w / 2, this._h / 2, (this._w / 2), 0, Math.PI * 2, false);
           ctx.clip();
        }

    }

}