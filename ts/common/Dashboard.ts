/// <reference path="../d/jquery-1.9.1.d.ts" />
module DbDashboards.Common {

    export class Dashboard {

        /**
         * create a background layer canvas and return the context
         * @param srcContext the source context to take the width and height from (or null to use only the padding)
         * @param width the width of the canvas
         * @param height the height of the canvas
         * @returns {CanvasRenderingContext2D}
         */
        createContextForLayer(srcContext: CanvasRenderingContext2D, width: number, height: number) {
            var buffer:HTMLCanvasElement = <HTMLCanvasElement>document.createElement('canvas');
            var w = (srcContext != null) ? srcContext.canvas.width : 0;
            var h = (srcContext != null) ? srcContext.canvas.height : 0;
            //buffer.width = w + xPadding;
            //buffer.height = h + yPadding;

            buffer.width = width;
            buffer.height = height;

            return buffer.getContext("2d");
        }



        destroy(){
            var t = 0;
            this.destroyInternal()
        }


        /**
         * Over ride in the derived class to free up resources
         */
        destroyInternal(){ }


        public static checkParameters(commandString: string, options: any) : DialParameters {
            var res = {
                commandString: "",
                options: {}
            };

            if (typeof commandString === "object") {
                res.options = commandString;
            } else if(typeof commandString === 'string') {
                res.commandString = commandString;
                if (typeof  options != "undefined"){
                    res.options = options;
                }
            }

            // set the default ID if not specified
            res.options = $.extend({id: "dbDashboard"}, res.options);


            return res;
        }

    }

    export interface Themes {
        dark: any;
        blue: any;
        chocolate: any;
        paper: any;
    }

    export interface DialParameters{
        commandString: string;
        options: any;
    }


}