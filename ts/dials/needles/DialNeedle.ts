
module DbDashboards.Dials {

    export class DialNeedle extends NeedleBase {

        constructor(options: DialOptions, needleContext: CanvasRenderingContext2D) {
            super(options, needleContext);
        }


        render(stepValue: number) {
            this.clear();
            this.needleContext.save();

            var cx = this.options.prv.needleX;
            var cy = this.options.prv.needleY;
          
            var normaized = (stepValue - this.options.value.min) / (this.options.value.max - this.options.value.min);

            var zeroAngle = this.options.prv.needleZeroOffset;
            var angle = zeroAngle + (normaized * this.options.prv.needleSweep);

            // rotate canvas to rotate needle
            this.needleContext.translate(cx, cy);
            this.needleContext.rotate(angle);
            this.needleContext.translate(-cx, -cy);

       

            this.needleContext.shadowColor = this.options.needle.shadowColor;
            this.needleContext.shadowBlur = this.options.needle.shadowBlur;
            this.needleContext.shadowOffsetX = this.options.needle.shadowX;
            this.needleContext.shadowOffsetY = this.options.needle.shadowY;


            this.needleContext.strokeStyle = this.options.needle.strokeStyle;
            this.needleContext.lineWidth = this.options.needle.strokeWidth;
            this.needleContext.fillStyle = this.options.needle.fillStyle;

            this._renderNeedle( cx, cy);
            

        


            // restore canvas rotation
            this.needleContext.translate(cx, cy);
            this.needleContext.rotate(-angle);
            this.needleContext.translate(-cx, -cy);
            this.needleContext.restore();
        }

        /**
         * If a needle has a part of it rendered under the center of rotation, this property
         * defines the height of the bit under the pivot point at 12 o'clock. It allows
         * the dial value to move itself out of harms way
         */
        descentHeightForNeedleBase() : number {
            return 0;
        }

        /**
         * make me proteced in typescript 1.1
         */
        _renderNeedle( x: number, y:number) {
            throw Error("Do not call the base render method, must be implemented in the derived class");
        }


    }

}

