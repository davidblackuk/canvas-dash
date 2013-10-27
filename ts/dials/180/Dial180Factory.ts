module DbDashboards.Dials {

    export class Dial180Factory extends ControlFactoryBase {
        

        constructor(options: DialOptions, target: JQuery) {
            super(options, target, ControlFactoryBase.dial180)
        }

        north(options: DialOptions, target: JQuery) {
            return new DbDashboards.Dials.Dial180N(options, target);
        }

        south(options: DialOptions, target: JQuery) {
            return new DbDashboards.Dials.Dial180S(options, target);
        }

        east(options: DialOptions, target: JQuery) {
            return new DbDashboards.Dials.Dial180E(options, target);
        }

        west(options: DialOptions, target: JQuery) {
            return new DbDashboards.Dials.Dial180W(options, target);
        }


    }

}