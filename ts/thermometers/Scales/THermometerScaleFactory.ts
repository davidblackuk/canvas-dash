

module DbDashboards.Dials {

    export class ThermometerScaleFactory implements ICreateScales {

        create(options: DialOptions, context: CanvasRenderingContext2D): ScaleBase {
            if (typeof this[options.orientation] == 'function') {
                return this[options.orientation](options, context);
            }
            return this.north(options, context);
        }

        north(options: DialOptions, context: CanvasRenderingContext2D): ScaleBase {
            return new ThermometerScale(options, context);
        }

        south(options: DialOptions, context: CanvasRenderingContext2D): ScaleBase {
            return this.north(options, context);
        }

        east(options: DialOptions, context: CanvasRenderingContext2D): ScaleBase {
            return this.north(options, context);
        }

        west(options: DialOptions, context: CanvasRenderingContext2D): ScaleBase {
            return this.north(options, context);
        }

    }
}

