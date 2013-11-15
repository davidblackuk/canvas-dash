module DbDashboards.Dials {

    /**
     * A circular 240 degree dial with a sweep of approximately 240 degrees
     */
    export class Dial360W extends Dial360 {
        constructor(options: DialOptions, public target: JQuery) {
            super(options, target)
        }

        public setOptions(options: PrivateOptions) {
            options.scaleStartAngle = ((3 * Math.PI) / 4) - Math.PI / 2;
            options.scaleEndAngle = ((Math.PI) / 4) - Math.PI / 2;
            options.needleZeroOffset =  Math.PI * 3/4;
        }


        /**
* Ask the dial where its value should be displayed
*/
        getDialValuePostion(): TranslationAndRotation {
            var res = { x: 0, y: 0, r: 0 };
            res.y = (this.options.prv.effectiveWidth / 2);

            res.x = this.options.bezel.margin + this.options.bezel.width / 2;
            res.x += this.options.scale.margin + this.options.scale.width / 2;
            res.x += this.options.value.margin;

            res.x = this.options.prv.effectiveHeight - res.x;
            return res;
        }
    }
}