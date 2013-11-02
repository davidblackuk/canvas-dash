
module DbDashboards.Dials {

    export class SliderNeedleDart extends SliderNeedle {

        constructor(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            super(options, needleContext);
        }

        _renderNeedle(pos: Point) {
            var hw = this.options.needle.width / 2 - (this.options.needle.strokeWidth / 2);
            var needleLength = this.options.prv.needleLength;

            this.needleContext.beginPath();
            this.arrow(pos.x, pos.y - this.options.prv.needleLength / 2);
            this.needleContext.lineTo(pos.x, pos.y + this.options.prv.needleLength / 2);
            this.arrow(pos.x, pos.y );
            this.needleContext.stroke();


        }
    }


}

