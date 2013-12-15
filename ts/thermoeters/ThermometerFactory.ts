module DbDashboards.Dials {


    export class ThermometerFactory extends ControlFactoryBase {


        constructor(options: DialOptions, target: JQuery) {
            super(options, target, ControlFactoryBase.thermometer)
        }

        north(options: DialOptions, target: JQuery) {
            return new ThermometerN(options, target);
        }

        south(options: DialOptions, target: JQuery) {
            return this.north(options,target);
        }

        east(options: DialOptions, target: JQuery) {
            return new ThermometerE(options, target);
        }

        west(options: DialOptions, target: JQuery) {
            return this.east(options, target);
        }

    }

}