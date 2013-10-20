/// <reference path="DialOptions.ts" />
/// <reference path="DialBase.ts" />


module DbDashboards.Dials {

    export class DialNeedle {

        constructor(private dial:DialBase) {
        }

        addLayer(ctx: CanvasRenderingContext2D, stepValue: number) {
            ctx.save();

            var cx = this.dial.options.prv.needleX;
            var cy = this.dial.options.prv.needleY;
            var hw = this.dial.options.needle.width/2 - (this.dial.options.needle.strokeWidth/2) ;
            var nt = this.dial.options.bezel.margin + this.dial.options.bezel.width/2 + this.dial.options.needle.margin;
            var needleLength = this.dial.options.prv.needleLength - nt;

            var normaized = (stepValue - this.dial.options.value.min) / (this.dial.options.value.max - this.dial.options.value.min);

            var zeroAngle = this.dial.options.prv.needleZeroOffset;
            var angle = zeroAngle + (normaized * this.dial.options.prv.needleSweep);

            // rotate canvas to rotate needle
            ctx.translate(cx, cy);
            ctx.rotate(angle);
            ctx.translate(-cx, -cy);

       

            ctx.shadowColor = this.dial.options.needle.shadowColor;
            ctx.shadowBlur = this.dial.options.needle.shadowBlur;
            ctx.shadowOffsetX = this.dial.options.needle.shadowX;
            ctx.shadowOffsetY = this.dial.options.needle.shadowY;


            ctx.strokeStyle = this.dial.options.needle.strokeStyle;
            ctx.lineWidth = this.dial.options.needle.strokeWidth;
            ctx.fillStyle = this.dial.options.needle.fillStyle;

            switch (this.dial.options.needle.style) {
                case "line":
                    ctx.fillRect(cx - hw, cy - needleLength, hw * 2, needleLength);
                    break;
                default:
                    ctx.moveTo(cx, cy);
                    ctx.beginPath();

                    ctx.lineTo(cx - hw, cy);
                    ctx.lineTo(cx, cy - needleLength);
                    ctx.lineTo(cx + hw, cy);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    break;
            }
            

        


            // restore canvas rotation
            ctx.translate(cx, cy);
            ctx.rotate(-angle);
            ctx.translate(-cx, -cy);
            ctx.restore();
        }
    }

}

