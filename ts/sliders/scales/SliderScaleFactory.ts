

module DbDashboards.Dials {

    export class SliderScaleFactory implements ICreateScales {

        create(options: DialOptions, context: CanvasRenderingContext2D) : ScaleBase {
            if (typeof this[options.orientation] == 'function') {
                return this[options.orientation](options, context);
            }
            return this.north(options, context);
        }

        north(options: DialOptions, context: CanvasRenderingContext2D) : ScaleBase {
            return new SliderScaleN(options, context);
        }

        south(options: DialOptions, context: CanvasRenderingContext2D): ScaleBase {
            return new SliderScaleS(options, context);
        }

        east(options: DialOptions, context: CanvasRenderingContext2D): ScaleBase {
            return new SliderScaleE(options, context);
        }

        west(options: DialOptions, context: CanvasRenderingContext2D): ScaleBase {
            return new SliderScaleW(options, context);
        }

    }
}

