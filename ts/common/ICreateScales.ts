module DbDashboards.Dials {

    export interface ICreateScales {

        create(options: DialOptions, context: CanvasRenderingContext2D): ScaleBase;

    }

}