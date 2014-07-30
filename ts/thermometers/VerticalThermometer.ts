

module DbDashboards.Dials {

    /**
     * A horizontal gauge
     */
    export class VerticalThermometer extends Thermometer {

        /**
         * Constructs a new Dial360
         * @param options the options for the Dial360
         */
        constructor(options: DialOptions, public target: JQuery) {
            super(options, target);
            var x = this.effectiveWidth() - this.needleCenterFromTop();
         
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
                needleRotation: 0
            };
        }


        /**
        * Ask the dial where its value should be displayed
        */
        getDialValuePostion(): TranslationAndRotation {
            var tx = (this.options.prv.effectiveWidth / 2);
            var margin = this.options.bezel.margin * 2 + this.options.bezel.width + this.options.value.margin;
            var ty = (this.options.height - margin) ;
            return { x: tx, y: ty, r: 0};
        }

    }
}
