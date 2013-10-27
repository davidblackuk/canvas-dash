module DbDashboards.Dials {

    export class Dial360Factory extends ControlFactoryBase {


        constructor(options: DialOptions, target: JQuery) {
            super(options, target, ControlFactoryBase.dial360)
        }

        north(options: DialOptions, target: JQuery) {
            return new Dial360(options, target);
       }

        south(options: DialOptions, target: JQuery) {
            return this.north(options, target);
        }

        east(options: DialOptions, target: JQuery) {
            return this.north(options, target);
        }

        west(options: DialOptions, target: JQuery) {
            return this.north(options, target);
        }


    }

}