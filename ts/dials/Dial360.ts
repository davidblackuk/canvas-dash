/// <reference path="../d/jquery-1.9.1.d.ts" />
/// <reference path="DialOptions.ts" />
/// <reference path="DialBase.ts" />

module DbDashboards.Dials {

    /**
     * A circular 240 degree dial with a sweep of approximately 240 degrees
     */
    export class Dial360 extends DialBase {

        /**
         * Constructs a new Dial360
         * @param options the options for the Dial360
         */
          constructor( options:DialOptions, public target:JQuery) {
            super(<DialOptions> Dial360.overrideDefaults,  options, target);

            var w = this.target.width();
            if (this.options.width != undefined){
                w = Math.min(this.options.width, w);
            }

            var h = this.target.height();
            if (this.options.height != undefined){
                w = Math.min(this.options.height, h);
            }

            var minAxisSize = (Math.min(w, h))-1;

            this.options.prv = {
                effectiveHeight: minAxisSize,
                effectiveWidth: minAxisSize,
                scaleStartAngle: (3*Math.PI)/4,
                scaleEndAngle: (Math.PI)/4,

                needleZeroOffset: -(3*Math.PI)/4,
                needleSweep: 270 * DialScale.piOver180,
                needleX: minAxisSize/2,
                needleY: minAxisSize/2,
                needleLength:minAxisSize/2

        };

        }


        /**
         * Applies a mask to the prevent glass highlights etc over flowing
         */
        applyMask(ctx: CanvasRenderingContext2D) {
            var m = new DialMask(this);
            m.addLayer(ctx);
        }


        addScale(ctx: CanvasRenderingContext2D) {
            var s = new DialScale(this);
            s.addLayer(ctx);

        }

        drawNeedle(ctx: CanvasRenderingContext2D, stepValue: number){
            var s = new DialNeedle(this);
            this.needleContext.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
            s.addLayer(ctx, stepValue);
            var v = new DialValue(this);
            v.addLayer(ctx, stepValue);
        }

        addBezel(ctx: CanvasRenderingContext2D) {
            var b = new DialBezel(this);
            b.addLayer(ctx);
        }


        public static overrideDefaults = {
            type: DialBase.Dial360,
            value: {
                margin: 15
            }
        };
    }

}
