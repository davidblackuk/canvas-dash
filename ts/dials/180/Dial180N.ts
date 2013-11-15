module DbDashboards.Dials {
    /**
    * A semicircular 180 degree dial with a sweep of  180 degrees
    */
    export class Dial180N extends Dial180 {


        /**
         * Constructs a new Dial360
         * @param options the options for the Dial360
         */
        constructor(options: DialOptions, public target: JQuery) {
            super(DialBase.Dial180N, <DialOptions>Dial180.overrideDefaults, options, target);

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
                effectiveHeight: minAxisSize,
                effectiveWidth: minAxisSize,
                scaleStartAngle: Math.PI,
                scaleEndAngle: 0,
                needleZeroOffset: -Math.PI / 2,
                needleSweep: 180 * DialScale.piOver180,
                needleX: (minAxisSize / 2),
                needleY: (minAxisSize / 2),
                needleLength: minAxisSize / 2
            };

        }

        /**
        * Ask the dial where its value should be displayed
        */
        getDialValuePostion(): TranslationAndRotation {
            var ty = 0;
            var tx = 0;
            var r = 0;

            tx = (this.options.prv.effectiveWidth / 2);
            ty = this.options.prv.needleY + this.options.value.font.pixelSize + this.options.needle.width;

            return {x: tx, y: ty, r: r};
        }

    }
}