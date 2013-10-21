module DbDashboards.Dials {
 /**
  * A semicircular 180 degree dial with a sweep of  180 degrees
  */
    export class Dial180W extends Dial180 {


        constructor(options: DialOptions, public target: JQuery) {
            super(DialBase.Dial180W, <DialOptions>Dial180.overrideDefaults, options, target);

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
                effectiveWidth: (minAxisSize / 2 + this.options.baseRunOutSize),

                scaleStartAngle: Math.PI / 2,
                scaleEndAngle: 3 * Math.PI / 2,


                needleZeroOffset: Math.PI,
                needleSweep: 180 * DialScale.piOver180,
                needleX: minAxisSize / 2,
                needleY: minAxisSize / 2,
                needleLength: minAxisSize / 2

            };

        }
    }
}