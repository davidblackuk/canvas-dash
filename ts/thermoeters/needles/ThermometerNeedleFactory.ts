

module DbDashboards.Dials {

    export class ThermometerNeedleFactory implements ICreateNeedles {

        constructor() {
        }

        create(options: DialOptions, needleContext: CanvasRenderingContext2D): NeedleBase {
            return new ThermometerNeedle(options, needleContext);
        }



    }

}

