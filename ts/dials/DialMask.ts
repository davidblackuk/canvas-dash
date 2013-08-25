/// <reference path="DialOptions.ts" />
/// <reference path="DialBase.ts" />
/// <reference path="Dial180.ts" />


module DbDashboards.Dials {

    export class DialMask {

        constructor(private dial:DialBase) {
        }

        addLayer(ctx: CanvasRenderingContext2D) {


            var w = this.dial.options.prv.effectiveWidth;
            var h = this.dial.options.prv.effectiveHeight;


            switch (this.dial.options.type){
                case DialBase.Dial360:
                    ctx.arc(w / 2, h / 2, (w/2), 0, Math.PI * 2, false);

                    ctx.clip();
                    break;
                case DialBase.Dial180N:
                    ctx.beginPath();
                    ctx.moveTo(w/2, (h / 2) + this.dial.options.baseRunOutSize);
                    ctx.lineTo(0, (h/2) + this.dial.options.baseRunOutSize);
                    ctx.lineTo(0, h/2);
                    ctx.arc(w/2, h/2, w/2, Math.PI, 0, false);
                    ctx.lineTo(w, (h/2)+this.dial.options.baseRunOutSize);
                    ctx.closePath();
                    ctx.clip();
                    break;
                case DialBase.Dial180S:
                    ctx.beginPath();
                    ctx.moveTo(0,0);
                    ctx.lineTo(0,  this.dial.options.baseRunOutSize);
                    ctx.arc(w/2, this.dial.options.baseRunOutSize, w/2, Math.PI, 0, true);
                    ctx.lineTo(w,  0);
                    ctx.lineTo(0,  0);
                    ctx.closePath();
                    ctx.clip();
                    break;
                case DialBase.Dial180E:
                    ctx.beginPath();
                    ctx.moveTo(0,0);
                    ctx.lineTo(this.dial.options.baseRunOutSize, 0);
                    ctx.arc(this.dial.options.baseRunOutSize, h/2, h/2, 3*Math.PI/2, Math.PI/2, false);
                    ctx.lineTo(0,  h);
                    ctx.lineTo(0,  0);
                    ctx.closePath();
                    ctx.clip();
                    break;
                case DialBase.Dial180W:
                    ctx.beginPath();
                    ctx.moveTo(w, 0);
                    ctx.lineTo(w, h);
                    ctx.lineTo(w-this.dial.options.baseRunOutSize, h);
                    ctx.arc(w - this.dial.options.baseRunOutSize, h/2, h/2,  Math.PI/2,3*Math.PI/2, false);
                    ctx.lineTo(w,  0);
                    ctx.closePath();
                    ctx.clip();
                    break;
            }
        }

    }

}