
module DbDashboards.Dials {

    export class DialNeedleDart extends DialNeedle {
        private hw: number;
        public needleLength: number;

        constructor(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            super(options, needleContext);
            this.hw = options.needle.width / 2 - (options.needle.strokeWidth / 2);
            var nt = options.bezel.margin + options.bezel.width / 2 + options.needle.margin;
            this.needleLength = options.prv.needleLength - nt;

        }

        _renderNeedle(x: number, y: number) {
            //this.needleContext.fillRect(x - hw, y - needleLength, hw * 2, needleLength);

            this.needleContext.beginPath();
            this.arrow( x, y - this.needleLength);
            this.needleContext.lineTo(x, y);
            this.arrow( x, y);
            this.needleContext.stroke();

        }



       

        /**
        * If a needle has a part of it rendered under the center of rotation, this property
        * defines the height of the bit under the pivot point at 12 o'clock. It allows
        * the dial value to move itself out of harms way
        */
        descentHeightForNeedleBase(): number {
            return this.options.needle.width * 2;
        }

    }

}

