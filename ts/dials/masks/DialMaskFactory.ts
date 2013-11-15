

module DbDashboards.Dials {

    export class DialMaskFactory {
      
        constructor() {
        }

        static create(dial: DialBase) {

            switch (dial.options.type) {
                case DialBase.Dial360:
                    return new DialMask360(dial);
                case DialBase.Dial180N:
                    return new DialMask180N(dial);
                case DialBase.Dial180S:
                    return new DialMask180S(dial);
                case DialBase.Dial180E:
                    return new DialMask180E(dial);
                case DialBase.Dial180W:
                    return new DialMask180W(dial);
            }

        }

    }

}

