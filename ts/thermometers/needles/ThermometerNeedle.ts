
module DbDashboards.Dials {

    export interface ThermometerMetrics {
        x: number;
        y: number;
        w: number;
        h: number;
        bubbleRadius: number;
        tubeBaseY: number;
        bowlCenter: Point;
        bowlRadius: number;
    }

    export class ThermometerNeedle extends NeedleBase {
        step: number;
        metrics: ThermometerMetrics;

        constructor(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            super(options, needleContext);       
        }
    }
}

