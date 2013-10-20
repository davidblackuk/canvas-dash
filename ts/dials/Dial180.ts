/// <reference path="../d/jquery-1.9.1.d.ts" />
/// <reference path="DialOptions.ts" />
/// <reference path="DialBase.ts" />

module DbDashboards.Dials {

    export class Dial180 extends DialBase {


        constructor(private type: string, public dialSpecificOverrides: DialOptions, public userOverrides:DialOptions, public target:JQuery) {
            super(dialSpecificOverrides, userOverrides, target);
            this.options.type = type;
        }


        public static overrideDefaults = {
            value: {
                margin: 5
            }
        };

        addScale(ctx: CanvasRenderingContext2D) {
            var s = new DialScale(this);
            s.addLayer(ctx);

        }

        addBezel(ctx: CanvasRenderingContext2D) {
            var b = new DialBezel(this);
            b.addLayer(ctx);
        }

        drawNeedle(ctx: CanvasRenderingContext2D, stepValue: number){

            
            var s = new DialNeedle(this);

            this.clearNeedleContext();
        

            s.addLayer(this.needleContext, stepValue);



            var v = new DialValue(this);
            v.addLayer(ctx, stepValue);
        }

        /**
         * Applies a mask to the prevent glass highlights etc over flowing
         */
            applyMask(ctx: CanvasRenderingContext2D) {
            var m = new DialMask(this);
            m.addLayer(ctx);
        }

    }

    /**
     * A semicircular 180 degree dial with a sweep of  180 degrees
     */
    export class Dial180N extends Dial180 {


        /**
         * Constructs a new Dial360
         * @param options the options for the Dial360
         */
            constructor( options:DialOptions, public target:JQuery) {
                super(DialBase.Dial180N, <DialOptions>Dial180.overrideDefaults,  options, target);

            var w = this.target.width();
            if (this.options.width != undefined){
                w = this.options.width;
            }

            var h = this.target.height();
            if (this.options.height != undefined){
                h = this.options.height;
            }


            var minAxisSize = (Math.max(w, h))-1;

            this.options.prv = {
                effectiveHeight: minAxisSize,
                effectiveWidth: minAxisSize,
                scaleStartAngle:Math.PI,
                scaleEndAngle: 0,
                needleZeroOffset: -Math.PI/2,
                needleSweep: 180 * DialScale.piOver180,
                needleX: minAxisSize/2,
                needleY: minAxisSize/2,
                needleLength:minAxisSize/2
            };

        }
    }



    /**
     * A semicircular 180 degree dial with a sweep of  180 degrees
     */
    export class Dial180S extends Dial180 {


        constructor(options:DialOptions, public target:JQuery) {
            super(DialBase.Dial180S,  <DialOptions>Dial180.overrideDefaults,  options, target);

            var w = this.target.width();
            if (this.options.width != undefined){
                w = this.options.width;
            }

            var h = this.target.height();
            if (this.options.height != undefined){
                h = this.options.height;
            }


            var minAxisSize = (Math.max(w, h))-1;

            this.options.prv = {
                effectiveHeight: minAxisSize-1,
                effectiveWidth: minAxisSize-1,
                scaleStartAngle:0,
                scaleEndAngle: Math.PI,
                needleZeroOffset: Math.PI/2,
                needleSweep: 180 * DialScale.piOver180,
                needleX: minAxisSize/2,
                needleY: this.options.baseRunOutSize,
                needleLength:minAxisSize/2
            };

        }
    }

    /**
     * A semicircular 180 degree dial with a sweep of  180 degrees
     */
    export class Dial180E extends Dial180 {


        constructor( options:DialOptions, public target:JQuery) {
            super(DialBase.Dial180E,  <DialOptions>Dial180.overrideDefaults,  options, target);

            var w = this.target.width();
            if (this.options.width != undefined){
                w = this.options.width;
            }

            var h = this.target.height();
            if (this.options.height != undefined){
                h = this.options.height;
            }


            var minAxisSize = (Math.max(w, h))-1;

            this.options.prv = {
                effectiveHeight: minAxisSize-1,
                effectiveWidth: minAxisSize-1,

                scaleStartAngle:3*Math.PI/2,
                scaleEndAngle: Math.PI/2,

                needleZeroOffset: 0,
                needleSweep: 180 * DialScale.piOver180,
                needleX: this.options.baseRunOutSize,
                needleY: minAxisSize/2,
                needleLength:minAxisSize/2

            };

        }
    }

    /**
     * A semicircular 180 degree dial with a sweep of  180 degrees
     */
    export class Dial180W extends Dial180 {


        constructor(options:DialOptions, public target:JQuery) {
            super(DialBase.Dial180W,  <DialOptions>Dial180.overrideDefaults,  options, target);

            var w = this.target.width();
            if (this.options.width != undefined){
                w = this.options.width;
            }

            var h = this.target.height();
            if (this.options.height != undefined){
                h = this.options.height;
            }


            var minAxisSize = (Math.max(w, h))-1;

            this.options.prv = {
                effectiveHeight: minAxisSize-1,
                effectiveWidth: (minAxisSize/2+ this.options.baseRunOutSize),

                scaleStartAngle:Math.PI/2,
                scaleEndAngle:3* Math.PI/2,


                needleZeroOffset: Math.PI,
                needleSweep: 180 * DialScale.piOver180,
                needleX: minAxisSize/2,
                needleY: minAxisSize/2,
                needleLength:minAxisSize/2

            };

        }
    }
}

