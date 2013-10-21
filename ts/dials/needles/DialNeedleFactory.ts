

module DbDashboards.Dials {

    export class DialNeedleFactory {
        public static triangle: string = "triangle";
        public static arrow: string = "arrow";
        public static line: string = "line";
        public static dart: string = "dart";
        public static circleArrow: string = "circleArrow";


        constructor() {
        }

        static create(dial: DialBase) {

            switch (dial.options.needle.style) {
                case DialNeedleFactory.triangle:
                    return new DialNeedleTriangle(dial);
                    break;
                case DialNeedleFactory.arrow:
                    return new DialNeedleArrow(dial);
                    break;
                case DialNeedleFactory.line:
                    return new DialNeedleLine(dial);
                    break;
                case DialNeedleFactory.circleArrow:
                    return new DialNeedleCircleArrow(dial);
                    break;
                case DialNeedleFactory.dart:
                    return new DialNeedleDart(dial);
                    break;

            }

        }

    }

}

