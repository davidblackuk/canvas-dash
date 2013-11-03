
module DbDashboards.Dials {

    export class DialNeedleDot extends DialNeedle {

        constructor(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            super(options, needleContext);
        }


        _renderNeedle(x: number, y: number) {
            var nt = this.options.bezel.margin + this.options.bezel.width / 2 + this.options.needle.margin;
            var needleLength = this.options.prv.needleLength - nt;

            this.needleContext.lineWidth = 1;
            this.needleContext.fillStyle = this.options.needle.fillStyle;
            this.needleContext.strokeStyle = this.options.needle.strokeStyle;
            this.needleContext.beginPath();
            this.circle(x, y - needleLength);
            this.needleContext.closePath();
            this.needleContext.fill();
            this.needleContext.stroke();

        }

    }

}

