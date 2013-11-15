
module DbDashboards.Dials {

    export class DialNeedleArrow extends DialNeedle {
        private hw: number;
        private needleLength: number;

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
         
            this.needleContext.stroke();
            
        }

       

   

    }

}

