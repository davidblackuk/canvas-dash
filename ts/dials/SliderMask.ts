/// <reference path="DialOptions.ts" />
/// <reference path="DialBase.ts" />
/// <reference path="Dial180.ts" />



module DbDashboards.Dials {

    export class SliderMask {

        constructor(private dial: DialBase) {

        }

        addLayer(ctx: CanvasRenderingContext2D) {


            var w = this.dial.options.prv.effectiveWidth;
            var h = this.dial.options.prv.effectiveHeight;

            ctx.rect(0,0,w,h);
            ctx.clip();
        }
    }
}