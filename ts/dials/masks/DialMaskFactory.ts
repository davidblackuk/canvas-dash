

module DbDashboards.Dials {

    export class DialMaskFactory {
      
        constructor() {
        }

        static create(dial: DialBase) {
            var type = dial.options.type.toLocaleLowerCase();
            if (type == DialBase.Dial360) {
                return new DialMask360(dial);
            }           
            switch (dial.options.orientation) {
                case Orientations.North:
                    return new DialMask180N(dial);
                case Orientations.South:
                    return new DialMask180S(dial);
                case Orientations.East:
                    return new DialMask180E(dial);
                case Orientations.West:
                    return new DialMask180W(dial);
            }

        }

    }

}

