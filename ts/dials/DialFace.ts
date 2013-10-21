
module DbDashboards.Dials {

    export class DialFace {
        constructor(private dial: DialBase) {
        }

        addLayer(ctx: CanvasRenderingContext2D) {

            var w = this.dial.options.prv.effectiveWidth;
            var h = this.dial.options.prv.effectiveHeight;

            var gf = ctx.createLinearGradient(w/2,h, w/2, 0);
            gf.addColorStop(0, this.dial.options.face.gradientColor2);
            gf.addColorStop(1, this.dial.options.face.gradientColor1);
            ctx.fillStyle = gf;

            ctx.fillRect(0,0,w,h+this.dial.options.baseRunOutSize);
        }
    }
}