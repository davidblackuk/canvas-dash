

module DbDashboards.Dials {

    export class ThermometerNeedleFactory implements ICreateNeedles {

        constructor() {
        }

        create(options: DialOptions, needleContext: CanvasRenderingContext2D): NeedleBase {
            if (options.orientation == Orientations.North || options.orientation == Orientations.South) {
                return new HorizontalThermometerNeedle(options, needleContext);
            }
            return new VerticalThermometerNeedle(options, needleContext);
        }



    }

}

