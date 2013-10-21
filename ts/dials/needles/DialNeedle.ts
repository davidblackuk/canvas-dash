
module DbDashboards.Dials {

    export class DialNeedle {

        constructor(public dial:DialBase) {
        }

        render(ctx: CanvasRenderingContext2D, stepValue: number) {
            ctx.save();

            var cx = this.dial.options.prv.needleX;
            var cy = this.dial.options.prv.needleY;
          
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

            this._renderNeedle(ctx, cx, cy);
            

        


            // restore canvas rotation
            ctx.translate(cx, cy);
            ctx.rotate(-angle);
            ctx.translate(-cx, -cy);
            ctx.restore();
        }

        _renderNeedle(ctx: CanvasRenderingContext2D, x: number, y:number) {
            throw Error("Do not call the base render method, must be implemented in the derived class");
        }


    }

}

