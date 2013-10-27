module DbDashboards.Dials {

    export interface ICreateNeedles {

        create(options: DialOptions, needleContext: CanvasRenderingContext2D): NeedleBase;

    }

}