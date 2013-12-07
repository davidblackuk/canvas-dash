

module DbDashboards.Dials {

    export class SliderScaleN extends SliderScale {
        constructor(dialOptions: DialOptions, context: CanvasRenderingContext2D) {
            super(dialOptions, context);

            this.scaleBandX1 = this.options.sideMargin;
            this.scaleBandY1 = this.dialOptions.bezel.margin + this.dialOptions.bezel.width + this.options.margin + (this.options.width);
            this.scaleBandX2 = this.dialOptions.width - this.options.sideMargin;
            this.scaleBandY2 = this.scaleBandY1;
            this.majorTickSpacing = (this.scaleBandX2 - this.scaleBandX1) / (this.options.majorTicks.count - 1);
        }

        /**
         * calculate the start and end points of a major tick line for this dial and orientation
        */
        getMajorTickLine(step: number): Line {
            var x1 = this.scaleBandX1 + (this.majorTickSpacing * step);
            var y1 = this.scaleBandY1;
            var x2 = x1;
            var y2 = y1 + this.options.majorTicks.length + this.options.width;
            return new Line(x1, y1, x2, y2);
        }


        /**
         * calculate the start and end points of a minor tick line for this dial and orientation
        */
        getMinorTickLine(step: number, increment: number): Line {
            var start = this.scaleBandX1 + (this.majorTickSpacing * step);
            var x1 = start + (this.minorTickSpacing * increment);
            var y1 = this.scaleBandY1;
            var x2 = x1;
            var y2 = y1 + this.options.minorTicks.length + this.options.majorTicks.width;
            return new Line(x1, y1, x2, y2);
        }


        /**
         * gets the point at which the text for a major tick value should be rendered
         */
        getPointFoprScaleNumber(maj: number): TranslationAndRotation {
            var x = this.options.sideMargin + (this.majorTickSpacing * maj);
            var y = this.scaleY + this.options.width + this.options.margin + this.options.majorTicks.length + this.options.font.pixelSize / 2;
            return new TranslationAndRotation(x, y, 0);
        }

    }
}