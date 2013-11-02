
module DbDashboards.Dials {

    export class NeedleBase {


        /** 
         * constructs a new NeedleBase 
         */
        constructor(public options: DialOptions, public needleContext: CanvasRenderingContext2D) {
            // make needle context protected in typescript 1.1?
        }

        /**
         * render the needle onto the context provided
         */
        render(stepValue: number) {
            throw Error("Do not call the base render method, must be implemented in the derived class");
        }

        /**
         * If a needle has a part of it rendered under the center of rotation, this property
         * defines the height of the bit under the pivot point at 12 o'clock. It allows
         * the dial value to move itself out of harms way
         */
        descentHeightForNeedleBase(): number {
            return 0;
        }

        /**
         * gets the canvas for render ops
         */
        canvas() : HTMLCanvasElement {
            return this.needleContext.canvas;
        }

        /** 
         * clear the canvas to all transparent
         */
        clear() {
            // There was a bug using the canvas on parallels with ie 10 where clear rect on the 
            // context does not work. This workaround resizes the canvas to the same size causeing a clear.
            // Not pretty but necessary.
            this.needleContext.canvas.width = this.needleContext.canvas.width;
        }

        /**
         * destroy this object freeing up resources
         */
        destroy() {
            this.options = null;
            this.needleContext = null;
        }

        /**
         * draw an arrow head at a point based on current metrics
         */
        arrow(x: number, y: number) {
            var size = this.options.needle.width;
            this.needleContext.lineWidth = this.options.needle.width;
            this.needleContext.strokeStyle = this.options.needle.fillStyle;


            this.needleContext.moveTo(x - size, y + size * 2);
            this.needleContext.lineTo(x, y);
            this.needleContext.lineTo(x + size, y + size * 2);
            this.needleContext.moveTo(x, y);
        }

        circle(x: number, y: number) {
            this.needleContext.arc(x, y, this.options.needle.width, 0, Math.PI * 2);
        }
    }

}

