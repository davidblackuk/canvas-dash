
module DbDashboards.Dials {

    export class SliderNeedle extends NeedleBase {

        constructor(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            super(options, needleContext);
        }

        render(stepValue: number) {
            this.needleContext.save();
            this.clear();

            var normalized = (stepValue - this.options.value.min) / (this.options.value.max - this.options.value.min);
            var pos = this.tween(normalized);

            this.needleContext.shadowColor = this.options.needle.shadowColor;
            this.needleContext.shadowBlur = this.options.needle.shadowBlur;
            this.needleContext.shadowOffsetX = this.options.needle.shadowX;
            this.needleContext.shadowOffsetY = this.options.needle.shadowY;


            this.needleContext.strokeStyle = this.options.needle.strokeStyle;
            this.needleContext.lineWidth = this.options.needle.strokeWidth;
            this.needleContext.fillStyle = this.options.needle.fillStyle;

            // rotate canvas to rotate needle
            this.needleContext.translate(pos.x, pos.y);
            this.needleContext.rotate(this.options.prv.needleRotation);
            this.needleContext.translate(-pos.x, -pos.y);

            this._renderNeedle(pos);

            this.needleContext.translate(pos.x, pos.y);
            this.needleContext.rotate(-this.options.prv.needleRotation);
            this.needleContext.translate(-pos.x, -pos.y);
            this.needleContext.restore();




        }


        tween(normalizedValue: number) {
            return new Point(this.options.prv.minPoint.x + ((this.options.prv.maxPoint.x - this.options.prv.minPoint.x) * normalizedValue),
                this.options.prv.minPoint.y + ((this.options.prv.maxPoint.y - this.options.prv.minPoint.y) * normalizedValue));

        }

       /**
       * make me proteced in typescript 1.1
       */
        _renderNeedle(pos: Point) {
            throw Error("Do not call the base render method, must be implemented in the derived class");
        }

    }


}

