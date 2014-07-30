 /// <reference path="ThermometerNeedle.ts" />
module DbDashboards.Dials {



    export class HorizontalThermometerNeedle extends ThermometerNeedle {


        constructor(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            super(options, needleContext);
            this.metrics = HorizontalThermometerNeedle.calculateMetrics(options);

        }

        render(stepValue: number) {
            this.clear();
            this.showMetrics();
        }

        public static calculateMetrics(options: DialOptions) {
            var metrics = {
                x: 0,
                y: 0,
                w: 0,
                bubbleRadius: options.needle.width * 2,
                h:0,
                tubeBaseY: 0,
                bowlCenter: { x: 0, y: 0 },
                bowlRadius: 0
            }
            return metrics;
        }



        showMetrics() {

            var c = this.needleContext;
            c.strokeStyle = "#00dd00";
            c.moveTo(0, this.options.height / 2);
            c.lineTo(this.options.width, this.options.height / 2);
            c.stroke();

        }



    }
}

