module DbDashboards.Marquees {

    export class MarqueeFactory extends DbDashboards.Dials.ControlFactoryBase {


        constructor(options: DbDashboards.Dials.DialOptions, target: JQuery) {
            super(options, target, DbDashboards.Dials.ControlFactoryBase.marquee)
        }

        north(options: DbDashboards.Dials.DialOptions, target: JQuery) {
            return new LedMarquee(options, target);
        }

        south(options: DbDashboards.Dials.DialOptions, target: JQuery) {
            return this.north(options, target);
        }

        east(options: DbDashboards.Dials.DialOptions, target: JQuery) {
            return this.north(options, target);
        }

        west(options: DbDashboards.Dials.DialOptions, target: JQuery) {
            return this.north(options, target);
        }


    }

}