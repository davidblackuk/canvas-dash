/// <reference path="../d/jquery-1.9.1.d.ts" />
/// <reference path="DialOptions.ts" />
/// <reference path="DialBase.ts" />
/// <reference path="SliderMask.ts" />
/// <reference path="SliderNeedle.ts" />


module DbDashboards.Dials {

    /**
     * A horizontal gauge
     */
    export class Slider extends DialBase {
        scaleInnerEdge: number;
        scaleOuterEdge: number;

        /**
         * Constructs a new Dial360
         * @param options the options for the Dial360
         */
            constructor(options:DialOptions, public target:JQuery) {
            super(<DialOptions> Slider.overrideDefaults, options, target);

            var w = this.options.width || this.target.width();
            var h = this.options.height || this.target.height();

            this.options.prv = {
                effectiveHeight: h,
                effectiveWidth: w,
                scaleStartAngle: 0,
                scaleEndAngle: 0,

                needleZeroOffset: -Math.PI,
                needleSweep: 270 * DialScale.piOver180,
                needleX: w/2,
                needleY: this.options.scale.margin+ this.options.bezel.margin+this.options.bezel.width,
                needleLength:10

            };

            if (this.options.orientation == DialBase.North || this.options.orientation == DialBase.South) {
                this.scaleInnerEdge = this.options.scale.sideMargin ;
                this.scaleOuterEdge = this.options.prv.effectiveWidth - this.options.scale.sideMargin;
            } else {
                this.scaleInnerEdge = this.options.scale.sideMargin ;
                this.scaleOuterEdge = this.options.prv.effectiveHeight - this.options.scale.sideMargin;

            }

        }


        public static overrideDefaults = {
            type: DialBase.Slider,
            value: {

            }
        };


        /**
         * Applies a mask to the prevent glass highlights etc over flowing
         */
            applyMask(ctx: CanvasRenderingContext2D) {
            var m = new SliderMask(this);
            m.addLayer(ctx);
        }

        addScale(ctx: CanvasRenderingContext2D) {
            var s = new SliderScale(this);
            s.addLayer(ctx);

        }

        drawNeedle(ctx: CanvasRenderingContext2D, stepValue: number){

            var normalized = (stepValue - this.options.value.min) / (this.options.value.max - this.options.value.min);


            var scaleY = this.options.bezel.margin + this.options.bezel.width+ this.options.scale.margin + (this.options.scale.width );


            switch (this.options.orientation) {
                case DialBase.North:
                    this.options.prv.needleY = this.options.bezel.margin + this.options.bezel.width + (this.options.scale.width );
                    this.options.prv.needleX = this.scaleInnerEdge + ((this.scaleOuterEdge - this.scaleInnerEdge)*normalized);
                    break;
                case DialBase.South:
                    this.options.prv.needleY = this.options.height - (this.options.bezel.margin + this.options.bezel.width + (this.options.scale.width ) );
                    this.options.prv.needleX = this.scaleInnerEdge + ((this.scaleOuterEdge - this.scaleInnerEdge)*normalized);
                    break;
                case DialBase.East:
                    this.options.prv.needleX =  this.options.width - (this.options.bezel.margin + this.options.bezel.width + (this.options.scale.width ));
                    this.options.prv.needleY = this.scaleInnerEdge + ((this.scaleOuterEdge - this.scaleInnerEdge)*normalized);
                    break;
                case DialBase.West:
                    this.options.prv.needleX =  this.options.bezel.margin + this.options.bezel.width + (this.options.scale.width );
                    this.options.prv.needleY = this.scaleInnerEdge + ((this.scaleOuterEdge - this.scaleInnerEdge)*normalized);
                    break;


            }


            //this.options.prv.needleX = this.scaleInnerEdge + ((this.scaleOuterEdge - this.scaleInnerEdge)*normalized);

            var s = new SliderNeedle(this);
            this.needleContext.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
            s.addLayer(ctx, 0);



            var v = new DialValue(this);
            v.addLayer(ctx, stepValue);
        }

        addBezel(ctx: CanvasRenderingContext2D) {
            var b = new SliderBezel(this);
            b.addLayer(ctx);
        }

    }
}
