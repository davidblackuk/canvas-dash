

module DbDashboards.Dials {

    export class DialNeedleFactory implements ICreateNeedles {
        public static triangle: string = "triangle";
        public static arrow: string = "arrow";
        public static line: string = "line";
        public static dart: string = "dart";
        public static dot: string = "dot";
        public static circleArrow: string = "circleArrow";


        constructor() {
        }

        create(options: DialOptions, needleContext: CanvasRenderingContext2D) : NeedleBase {

            if (typeof this[options.needle.style] == 'function') {
                return this[options.needle.style](options, needleContext);
            }
            return this.triangle(options, needleContext);
        }

        triangle(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            return new DialNeedleTriangle(options, needleContext);
        }

        arrow(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            return new DialNeedleArrow(options, needleContext);
        }

        line(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            return new DialNeedleLine(options, needleContext);
        }

        circleArrow(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            return new DialNeedleCircleArrow(options, needleContext);
        }

        dart(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            return new DialNeedleDart(options, needleContext);
        }

        dot(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            return new DialNeedleDot(options, needleContext);
        }


    }

}

