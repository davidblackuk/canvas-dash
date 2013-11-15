

module DbDashboards.Dials {

    /**
     * A horizontal gauge
     */
    export class SliderS extends Slider {

        /**
         * Constructs a new Dial360
         * @param options the options for the Dial360
         */
        constructor(options: DialOptions, public target: JQuery) {
            super(options, target);
         
       

            var y = this.effectiveHeight() - this.needleCenterFromTop();

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
                maxPoint: new Point(this.effectiveWidth() - this.needleMinimumOffSet() , y),
                needleRotation:0

            };

        }


        
        /**
        * Ask the dial where its value should be displayed
        */
        getDialValuePostion(): TranslationAndRotation {
            var tx = (this.options.prv.effectiveWidth / 2);
            var bezOffset = (this.options.bezel.width / 2) + this.options.bezel.margin;
            var ty = (bezOffset + (this.options.value.font.pixelSize));
            ty += this.options.value.margin;
      
            return { x: tx, y: ty, r: 0 };
        }
     


    }
}
