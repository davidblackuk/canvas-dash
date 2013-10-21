
module DbDashboards.Dials {

    export class SliderNeedle {

        constructor(private dial:DialBase) {
        }

        addLayer(ctx: CanvasRenderingContext2D, stepValue: number) {
            var cx = this.dial.options.prv.needleX;
            var cy = this.dial.options.prv.needleY;
            var hw = this.dial.options.needle.width ;
            var nt = this.dial.options.bezel.margin + this.dial.options.bezel.width/2 + this.dial.options.needle.margin;
            var needleLength = this.dial.options.prv.needleLength ;



            ctx.beginPath();

            ctx.strokeStyle = this.dial.options.needle.strokeStyle;
            ctx.lineWidth = this.dial.options.needle.strokeWidth;
            ctx.fillStyle = this.dial.options.needle.fillStyle;

            switch (this.dial.options.orientation) {
                case DialBase.North:
                    ctx.rect(cx-hw, cy, hw, needleLength);
                    break;
                case DialBase.South:
                    ctx.rect(cx-hw, cy-needleLength, hw, needleLength);
                    break;
                case DialBase.West:
                    ctx.rect(cx, cy-hw, needleLength, hw);
                    break;
                case DialBase.East:
                    ctx.rect(cx-needleLength, cy-hw, needleLength, hw);
                    break;
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();


        }
    }


}

