

module DbDashboards.Dials {



    /**
     * A horizontal gauge
     */
    export class Thermometer extends DialBase {
        public needleLength: number = 10;

        /**
         * Constructs a new Dial360
         * @param options the options for the Dial360
         */
        constructor(options: DialOptions, public target: JQuery) {
            super(<DialOptions> Thermometer.overrideDefaults, options, target, {
                needleFactory: new ThermometerNeedleFactory(),
                scaleFactory: new ThermometerScaleFactory()
            });
        }


        public static overrideDefaults = {
            type: DialBase.Thermometer,
            value: {

            }
        };


        /**
         * Applies a mask to the prevent glass highlights etc over flowing
         */
        getMask() {
            return new SliderMask(this);
        }






        addBezel(ctx: CanvasRenderingContext2D) {
            var b = new SliderBezel(this);
            b.addLayer(ctx);
        }


        effectiveHeight() {
            return this.options.height || this.target.height();
        }

        effectiveWidth() {
            return this.options.width || this.target.width();
        }

        /**
         * gets the y position for a horizontal gauges arrow in North orientation. This will be the x for a West dial and effective-that for other side
         */
        needleCenterFromTop() {
            return (this.options.bezel.margin +
                this.options.bezel.width +
                this.options.scale.margin +
                this.options.scale.width + (this.needleLength / 2));
        }

        needleMinimumOffSet() {
        
            return this.options.scale.sideMargin + this.options.scale.majorTicks.width / 2;
        }

    }
}
