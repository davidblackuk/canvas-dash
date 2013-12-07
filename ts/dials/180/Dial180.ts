
module DbDashboards.Dials {

    export class Dial180 extends DialBase {


        constructor(private type: string, 
            public dialSpecificOverrides: DialOptions, public userOverrides:DialOptions, public target:JQuery) {
                super(dialSpecificOverrides, userOverrides, target, {
                    needleFactory: new DialNeedleFactory(),
                    scaleFactory: new DialScaleFactory()
                });
            this.options.type = type;
        }


        public static overrideDefaults = {
            value: {
                margin: 5
            }
        };

        //addScale(ctx: CanvasRenderingContext2D) {
        //    var s = new DialScale(this.options, ctx);
        //    s.render();

        //}

        addBezel(ctx: CanvasRenderingContext2D) {
            var b = new DialBezel(this);
            b.addLayer(ctx);
        }

  



    }

   



   

   

 
}

