

module DbDashboards.Dials {

    export class ScaleBase {


        /** 
         * constructs a new NeedleBase 
         */
        constructor(public dialOptions: DialOptions, public context: CanvasRenderingContext2D) {
            // make needle context protected in typescript 1.1?
        }

        /**
         * render the needle onto the context provided
         */
        render() {
            throw Error("Do not call the base render method, must be implemented in the derived class");
        }


        /**
         * gets the canvas for render ops
         */
        canvas(): HTMLCanvasElement {
            return this.context.canvas;
        }

        /** 
         * clear the canvas to all transparent
         */
        clear() {
            // There was a bug using the canvas on parallels with ie 10 where clear rect on the 
            // context does not work. This workaround resizes the canvas to the same size causeing a clear.
            // Not pretty but necessary.
            this.context.canvas.width = this.context.canvas.width;
        }

        /**
         * destroy this object freeing up resources
         */
        destroy() {
            this.dialOptions = null;
            this.context = null;
        }

        drawTickLine(line: Line, tickOptions: TickOptions) {
            this.context.beginPath();
            this.context.strokeStyle = tickOptions.strokeStyle;
            this.context.lineWidth = tickOptions.width;
            this.context.moveTo(line.start.x, line.start.y);
            this.context.lineTo(line.end.x, line.end.y);
            this.context.closePath();
            this.context.stroke();
        }
    }

}

