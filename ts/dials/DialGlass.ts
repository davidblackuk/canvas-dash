

module DbDashboards.Dials {

    export class DialGlass implements IRender {
        public static ShapeInOut: string = "inOut";
        public static ShapeOut: string = "out";
        public static ShapeNone: string = "none";

        constructor(private dial: DialBase, public context: CanvasRenderingContext2D) {

        }

        render() {
            var w = this.dial.options.prv.effectiveWidth;
            var h = this.dial.options.prv.effectiveHeight;
            var ctx = this.context;
            ctx.beginPath();
            ctx.fillStyle="rgba(255,255,255,0.2)";

            if (this.dial.options.glass.shape == DialGlass.ShapeInOut) {
                ctx.moveTo(-10, h);
                ctx.quadraticCurveTo(10, h/2, (w/2)*0.8, h/2);
                ctx.quadraticCurveTo(w*0.8, (h/2)*1.1, w*0.8, -10);
            } else if (this.dial.options.glass.shape == DialGlass.ShapeOut) {
                ctx.moveTo(-10, (h/2) * 1.3);
                ctx.quadraticCurveTo(50, 0, w*1.1, (h/2)*0.7);
                ctx.lineTo(w*1.1,-10);
            }
            ctx.lineTo(-10,-10)

            // complete custom shape
            ctx.closePath();
            ctx.fill();
        }

      /**
      * gets the canvas for render ops
      */
        canvas(): HTMLCanvasElement {
            return this.context.canvas;
        }


        /**
         * destroy this object freeing up resources
         */
        destroy() {
            this.context = null;
        }
    }

}

