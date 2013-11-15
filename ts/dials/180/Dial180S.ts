module DbDashboards.Dials {
    /**
    * A semicircular 180 degree dial with a sweep of  180 degrees
    */
    export class Dial180S extends Dial180 {


        constructor(options: DialOptions, public target: JQuery) {
            super(DialBase.Dial180S, <DialOptions>Dial180.overrideDefaults, options, target);

            var w = this.target.width();
            if (this.options.width != undefined) {
                w = this.options.width;
            }

            var h = this.target.height();
            if (this.options.height != undefined) {
                h = this.options.height;
            }


            var minAxisSize = (Math.max(w, h)) - 1;

            this.options.prv = {
                effectiveHeight: minAxisSize - 1,
                effectiveWidth: minAxisSize - 1,
                scaleStartAngle: 0,
                scaleEndAngle: Math.PI,
                needleZeroOffset: Math.PI / 2,
                needleSweep: 180 * DialScale.piOver180,
                needleX: minAxisSize / 2,
                needleY: this.options.baseRunOutSize,
                needleLength: minAxisSize / 2
            };

        }

        /**
        * Ask the dial where its value should be displayed
        */
        getDialValuePostion(): TranslationAndRotation {
            var tx = this.options.prv.effectiveWidth / 2;
            var ty = this.options.prv.needleY - this.options.needle.width - 3;
            var r = 0;
            return { x: tx, y: ty, r: r };
        }

    }

    
}