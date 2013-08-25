/// <reference path="DialOptions.ts" />
/// <reference path="DialBase.ts" />
/// <reference path="Dial180.ts" />



module DbDashboards.Dials {

    export class SliderBezel {

        constructor(private dial: DialBase) {

        }

        addLayer(ctx: CanvasRenderingContext2D) {

            var w = this.dial.options.prv.effectiveWidth;
            var h = this.dial.options.prv.effectiveHeight;

            var offset = (this.dial.options.bezel.width/2)+this.dial.options.bezel.margin;

            ctx.beginPath();
            ctx.strokeStyle =this.dial.options.bezel.strokeStyle;
            ctx.lineWidth =  this.dial.options.bezel.width;

            ctx.rect(offset,offset, w - 2*offset, h - 2*offset);

            ctx.closePath();
            ctx.stroke();
        }
    }
}