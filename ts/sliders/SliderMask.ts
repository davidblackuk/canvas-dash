

module DbDashboards.Dials {

    export class SliderMask extends DialMask {

        constructor( dial: DialBase) {
            super(dial);
        }

        apply(ctx: CanvasRenderingContext2D) {


            var w = this.dial.options.prv.effectiveWidth;
            var h = this.dial.options.prv.effectiveHeight;

            ctx.rect(0,0,w,h);
            ctx.clip();
        }
    }
}