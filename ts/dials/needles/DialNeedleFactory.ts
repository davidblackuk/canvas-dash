

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

            switch (options.needle.style) {
                case DialNeedleFactory.triangle:
                    return new DialNeedleTriangle(options, needleContext);
                    break;
                case DialNeedleFactory.arrow:
                    return new DialNeedleArrow(options, needleContext);
                    break;
                case DialNeedleFactory.line:
                    return new DialNeedleLine(options, needleContext);
                    break;
                case DialNeedleFactory.circleArrow:
                    return new DialNeedleCircleArrow(options, needleContext);
                    break;
                case DialNeedleFactory.dart:
                    return new DialNeedleDart(options, needleContext);
                    break;
                case DialNeedleFactory.dot:
                    return new DialNeedleDot(options, needleContext);
                    break;

            }

        }

    }

}

