
module DbDashboards.Dials {

    export class DialFace implements IRender {

        constructor(private dial: DialBase, public context: CanvasRenderingContext2D) {
        }

        /**
         * render the face onto the context provided
         */
        render() {

            var w = this.dial.options.prv.effectiveWidth;
            var h = this.dial.options.prv.effectiveHeight;

            var gf = this.context.createLinearGradient(w/2,h, w/2, 0);
            gf.addColorStop(0, this.dial.options.face.gradientColor2);
            gf.addColorStop(1, this.dial.options.face.gradientColor1);
            this.context.fillStyle = gf;

            this.context.fillRect(0,0,w,h+this.dial.options.baseRunOutSize);
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