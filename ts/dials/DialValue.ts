
module DbDashboards.Dials {

    export class DialValue {

        constructor(private dial:DialBase) {

        }

        addLayer(ctx: CanvasRenderingContext2D, stepValue: number) {
            ctx.font = this.dial.options.value.font.pixelSize +"px "+ this.dial.options.value.font.family;

            ctx.fillStyle = this.dial.options.value.font.fillStyle;
            ctx.strokeStyle = this.dial.options.value.font.strokeStyle;

            var txt = $.number(stepValue, this.dial.options.value.decimalPlaces);

            var ty = 0;
            var tx = 0;
            var r = 0;

            switch (this.dial.options.type){
                case DialBase.Dial360:
                    tx =  (this.dial.options.prv.effectiveWidth/2);
                    ty = (this.dial.options.prv.effectiveHeight- (this.dial.options.bezel.margin + this.dial.options.bezel.width/2) ) ;
                    ty = ty - this.dial.options.value.margin;
                    break;
                case DialBase.Dial180N:
                    tx =  (this.dial.options.prv.effectiveWidth/2);
                    ty = this.dial.options.prv.needleY + this.dial.options.value.font.pixelSize + this.dial.options.needle.width;
                    break;
                case DialBase.Dial180S:
                    tx = this.dial.options.prv.effectiveWidth/2;
                    ty = this.dial.options.prv.needleY - this.dial.options.needle.width - 3;
                    break;
                case DialBase.Dial180E:
                    tx = this.dial.options.prv.needleX - this.dial.options.value.font.pixelSize - this.dial.options.needle.width ;

                    ty = this.dial.options.prv.effectiveHeight/2;
                    r = Math.PI/2;
                    break;
                case DialBase.Dial180W:
                    tx = this.dial.options.prv.needleX + this.dial.options.value.font.pixelSize + this.dial.options.needle.width ;
                    ty = this.dial.options.prv.effectiveHeight/2;
                    r = 3*Math.PI/2;
                    break;
                case DialBase.Slider:
                    switch (this.dial.options.orientation) {
                        case Orientations.North:
                            tx =  (this.dial.options.prv.effectiveWidth/2);
                            var bezOffset = (this.dial.options.bezel.width/2)+this.dial.options.bezel.margin;
                            ty = this.dial.options.height - (bezOffset + (this.dial.options.value.font.pixelSize/2));
                            break;
                        case Orientations.South:
                            tx =  (this.dial.options.prv.effectiveWidth/2);
                            var bezOffset = (this.dial.options.bezel.width/2)+this.dial.options.bezel.margin;
                            ty = (bezOffset + (this.dial.options.value.font.pixelSize));
                            ty += this.dial.options.value.margin;
                            break;
                        case Orientations.East:
                            ty =  (this.dial.options.prv.effectiveHeight/2);
                            var bezOffset = (this.dial.options.bezel.width/2)+this.dial.options.bezel.margin;
                            tx =  (bezOffset + (this.dial.options.value.font.pixelSize))+2;
                            break;
                        case Orientations.West:
                            ty =  (this.dial.options.prv.effectiveHeight/2);
                            var bezOffset = (this.dial.options.bezel.width/2)+this.dial.options.bezel.margin;
                            tx = this.dial.options.width - (bezOffset + (this.dial.options.value.font.pixelSize)+2);
                            break;
                    }
                    r = 0;
                    break;

            }


            ctx.textAlign = "center";
            ctx.translate(tx, ty);
            ctx.rotate(r);
            ctx.translate(-tx, -ty);

            ctx.fillText(txt, tx, ty);


            ctx.translate(tx, ty);
            ctx.rotate(-r);
            ctx.translate(-tx, -ty);

        }



    }

}

