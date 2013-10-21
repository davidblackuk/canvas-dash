

module DbDashboards.Dials {

    export class DialBezel {

        constructor(private dial: DialBase) {

        }

        addLayer(ctx: CanvasRenderingContext2D) {

            var w = this.dial.options.prv.effectiveWidth;
            var h = this.dial.options.prv.effectiveHeight;

            var offset = (this.dial.options.bezel.width/2)+this.dial.options.bezel.margin;

            ctx.beginPath();
            ctx.strokeStyle =this.dial.options.bezel.strokeStyle;
            ctx.lineWidth =  this.dial.options.bezel.width;

            switch (this.dial.options.type){
                case DialBase.Dial360:

                    ctx.arc(this.dial.options.prv.effectiveWidth/2, this.dial.options.prv.effectiveHeight/2, (w/2) - offset, 0, Math.PI * 2, false);
                    break;

                case DialBase.Dial180N:
                    ctx.moveTo(w/2, (h / 2) - offset + this.dial.options.baseRunOutSize);
                    ctx.lineTo(offset, (h/2) - offset + this.dial.options.baseRunOutSize);
                    ctx.lineTo(offset, h/2 - offset);
                    ctx.arc(w/2, h/2, (w/2)-offset, Math.PI, 0, false);
                    ctx.lineTo(w-offset, (h/2) - offset+this.dial.options.baseRunOutSize);
                    ctx.closePath();
                    break;
                case DialBase.Dial180S:
                    ctx.moveTo(offset,offset);
                    ctx.lineTo(offset,  this.dial.options.baseRunOutSize+offset);
                    ctx.arc(w/2, this.dial.options.baseRunOutSize, (w/2)-offset, Math.PI, 0, true);
                    ctx.lineTo(w-offset,  offset);
                    ctx.lineTo(offset, offset);
                    break;
                case DialBase.Dial180E:
                    ctx.moveTo(offset,offset);
                    ctx.lineTo(this.dial.options.baseRunOutSize+offset, offset);
                    ctx.arc(this.dial.options.baseRunOutSize, h/2, (h/2) - offset, 3*Math.PI/2, Math.PI/2, false);
                    ctx.lineTo(offset,  h-offset);
                    ctx.lineTo(offset, offset);
                    break;
                case DialBase.Dial180W:
                    ctx.moveTo(w-offset, offset);
                    ctx.lineTo(w-offset, h-offset);
                    ctx.lineTo((w-this.dial.options.baseRunOutSize)-offset, h-offset);
                    ctx.arc(w - this.dial.options.baseRunOutSize, h/2, (h/2)-offset,  Math.PI/2,3*Math.PI/2, false);
                    ctx.lineTo(w-offset,  offset);
                    break;
            }
            ctx.closePath();
            ctx.stroke();
        }
    }
}