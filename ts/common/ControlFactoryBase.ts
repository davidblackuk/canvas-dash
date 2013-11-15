module DbDashboards.Dials {

    export class ControlFactoryBase {
        public static slider: string = "slider";
        public static dial180: string = "dial180";
        public static dial360: string = "dial360";
        public static marquee: string = "marquee";

        constructor(public options: DialOptions, public target: JQuery, expectedType: string) {
            if (options.type.toLowerCase() != expectedType) {
                throw Error("ControlFactory::Illegal options, expected: " + expectedType + " got: " + options.type);
            }
            options.orientation = Orientations.parse(options.orientation);

        }


        /**
         * factory for sliders
         */
        create() {
            // derived classes implement one method named per orientation north() etc
            // this line dispatches the calls to the sub class
            return this[this.options.orientation](this.options, this.target);
        }


    }

}