

module DbDashboards.Dials {

    /**
     * A horizontal gauge
     */
    export class SliderW extends Slider {

        /**
         * Constructs a new Dial360
         * @param options the options for the Dial360
         */
        constructor(options: DialOptions, public target: JQuery) {
            super(options, target);



            var x = this.needleCenterFromTop();

            this.options.prv = {
                effectiveHeight: this.effectiveHeight(),
                effectiveWidth: this.effectiveWidth(),
                scaleStartAngle: 0,
                scaleEndAngle: 0,
                needleZeroOffset: 0,
                needleSweep: 0,
                needleX: 0,
                needleY: 0,
                needleLength: this.needleLength,
                minPoint: new Point(x, this.needleMinimumOffSet()),
                maxPoint: new Point(x, this.effectiveHeight() - this.needleMinimumOffSet()),
                needleRotation: Math.PI /2

            };

        }

    }
}
