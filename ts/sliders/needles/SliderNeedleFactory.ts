

module DbDashboards.Dials {

    export class SliderNeedleFactory implements ICreateNeedles {
        public static triangle: string = "triangle";
        public static arrow: string = "arrow";
        public static line: string = "line";
        public static dart: string = "dart";
        public static circleArrow: string = "circleArrow";


        constructor() {
        }

        create(options: DialOptions, needleContext: CanvasRenderingContext2D): NeedleBase {
            if (typeof this[options.needle.style] == 'function') {
                return this[options.needle.style](options, needleContext);
            }
            return this.triangle(options, needleContext);
        }


        triangle(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            return new SliderNeedleTriangle(options, needleContext);
        }

        DialNeedleFactory(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            return new SliderNeedleArrow(options, needleContext);
        }

        line(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            return new SliderNeedleLine(options, needleContext);
        }

        circleArrow(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            return new SliderNeedleCircleArrow(options, needleContext);
        }

        dart(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            return new SliderNeedleDart(options, needleContext);
        }

        dot(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            return new SliderNeedleDot(options, needleContext);
        }
    }

}

