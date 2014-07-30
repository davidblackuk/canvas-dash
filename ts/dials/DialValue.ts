
module DbDashboards.Dials {

    export class DialValue {

        constructor(private dial:DialBase) {

        }

        render(ctx: CanvasRenderingContext2D, stepValue: number, position: TranslationAndRotation) {
            ctx.font = this.dial.options.value.font.pixelSize +"px "+ this.dial.options.value.font.family;

            ctx.fillStyle = this.dial.options.value.font.fillStyle;
            ctx.strokeStyle = this.dial.options.value.font.strokeStyle;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowColor = "rgba(0,0,0,0)";
            var txt = stepValue.toFixed(this.dial.options.value.decimalPlaces);


            ctx.textAlign = "center";
            ctx.translate(position.x, position.y);
            ctx.rotate(position.r);
            ctx.translate(-position.x, -position.y);

            ctx.fillText(txt, position.x, position.y);


            ctx.translate(position.x, position.y);
            ctx.rotate(-position.r);
            ctx.translate(-position.x, -position.y);

        }      

    }

}

