module DbDashboards.Dials {

    export class SliderFactory extends ControlFactoryBase {
      

        constructor(options: DialOptions, target: JQuery) {
            super(options, target, ControlFactoryBase.slider)
        }

        north(options: DialOptions, target: JQuery) {
            return new DbDashboards.Dials.SliderN(options, target);
        }

        south(options: DialOptions, target: JQuery) {
            return new DbDashboards.Dials.SliderS(options, target);
        }
    
        east(options: DialOptions, target: JQuery) {
            return new DbDashboards.Dials.SliderE(options, target);
        }

        west(options: DialOptions, target: JQuery) {
            return new DbDashboards.Dials.SliderW(options, target);
        }

    }

}