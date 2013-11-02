

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

           

            switch (options.needle.style) {
                case DialNeedleFactory.triangle:
                    return new SliderNeedleLine(options, needleContext);
                    break;
                case DialNeedleFactory.arrow:
                    return new SliderNeedleArrow(options, needleContext);
                    break;
                case DialNeedleFactory.line:
                    return new SliderNeedleLine(options, needleContext);
                    break;
                case DialNeedleFactory.circleArrow:
                    return new SliderNeedleCircleArrow(options, needleContext);
                    break;
                case DialNeedleFactory.dart:
                    return new SliderNeedleDart(options, needleContext);
                    break;

            }

        }

    }

}

