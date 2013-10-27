
module DbDashboards.Dials {

    export class DialNeedleTriangle extends DialNeedle {

        constructor(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            super(options, needleContext);
        }


        _renderNeedle( x: number, y:number ) {
            var hw = this.options.needle.width / 2 - (this.options.needle.strokeWidth / 2);
            var nt = this.options.bezel.margin + this.options.bezel.width / 2 + this.options.needle.margin;
            var needleLength = this.options.prv.needleLength - nt;

            this.needleContext.moveTo(x, y);
            this.needleContext.beginPath();

            this.needleContext.lineTo(x - hw, y);
            this.needleContext.lineTo(x, y - needleLength);
            this.needleContext.lineTo(x + hw, y);
            this.needleContext.closePath();
            this.needleContext.fill();
            this.needleContext.stroke();
        }

    }

}

