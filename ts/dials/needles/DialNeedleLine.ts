
module DbDashboards.Dials {

    export class DialNeedleLine extends DialNeedle {

        constructor(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            super(options, needleContext);
        }


        _renderNeedle(x:number, y:number ) {
            var hw = this.options.needle.width / 2 - (this.options.needle.strokeWidth / 2);
            var nt = this.options.bezel.margin + this.options.bezel.width / 2 + this.options.needle.margin;
            var needleLength = this.options.prv.needleLength - nt;
            this.needleContext.fillRect(x - hw, y - needleLength, hw * 2, needleLength);
        }

    }

}

