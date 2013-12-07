

module DbDashboards.Dials {

    export class DialScaleFactory implements ICreateScales {

        create(options: DialOptions, context: CanvasRenderingContext2D): ScaleBase {
            return new DialScale(options, context);
        }


    }
}

