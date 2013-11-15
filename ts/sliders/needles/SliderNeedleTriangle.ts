
module DbDashboards.Dials {

    export class SliderNeedleTriangle extends SliderNeedle {

        constructor(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            super(options, needleContext);
        }

        _renderNeedle(pos: Point) {
            var hw = this.options.needle.width / 2 - (this.options.needle.strokeWidth / 2);
            var needleLength = this.options.prv.needleLength;

            this.needleContext.lineWidth = 1;
            this.needleContext.fillStyle = this.options.needle.fillStyle;
            this.needleContext.strokeStyle = this.options.needle.strokeStyle;

          

            this.needleContext.beginPath();


            this.needleContext.moveTo(pos.x-this.options.needle.width/2, pos.y + this.options.prv.needleLength);
      
            this.needleContext.lineTo(pos.x, pos.y - this.options.prv.needleLength/2);
            this.needleContext.lineTo(pos.x + this.options.needle.width / 2, pos.y + this.options.prv.needleLength);
           

          
            this.needleContext.closePath();
            this.needleContext.fill();
            this.needleContext.stroke();


        }
    }


}

