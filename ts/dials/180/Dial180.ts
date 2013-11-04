
module DbDashboards.Dials {

    export class Dial180 extends DialBase {


        constructor(private type: string, 
            public dialSpecificOverrides: DialOptions, public userOverrides:DialOptions, public target:JQuery) {
                super(dialSpecificOverrides, userOverrides, target, {
                    needleFactory: new DialNeedleFactory()
                });
            this.options.type = type;
        }


        public static overrideDefaults = {
            value: {
                margin: 5
            }
        };

        addScale(ctx: CanvasRenderingContext2D) {
            var s = new DialScale(this);
            s.addLayer(ctx);

        }

        addBezel(ctx: CanvasRenderingContext2D) {
            var b = new DialBezel(this);
            b.addLayer(ctx);
        }

  

        /**
         * Applies a mask to the prevent glass highlights etc over flowing
         */
            applyMask(ctx: CanvasRenderingContext2D) {
            var m = DialMaskFactory.create(this);
            m.apply(ctx);
        }

    }

   



   

   

 
}

