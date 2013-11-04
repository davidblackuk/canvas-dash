

module DbDashboards.Dials {

    /**
     * A horizontal gauge
     */
    export class SliderN extends Slider {

        /**
         * Constructs a new Dial360
         * @param options the options for the Dial360
         */
        constructor(options: DialOptions, public target: JQuery) {
            super(options, target);



            var y = this.needleCenterFromTop();

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
                minPoint: new Point(this.needleMinimumOffSet(), y),
                maxPoint: new Point( this.effectiveWidth()- this.needleMinimumOffSet(), y),
                needleRotation: Math.PI

            };

        }


        
        /**
        * Ask the dial where its value should be displayed
        */
        getDialValuePostion(): TranslationAndRotation {
            var tx = (this.options.prv.effectiveWidth / 2);
            var bezOffset = (this.options.bezel.width / 2) + this.options.bezel.margin;
            var ty = this.options.height - (bezOffset + (this.options.value.font.pixelSize / 2));

            return { x: tx, y: ty, r: 0 };
        }
      

    }
}
