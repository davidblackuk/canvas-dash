/// <reference path="../d/jquery-1.9.1.d.ts" />
module DbDashboards.Dials {

    export class Orientations {

        public static North: string = "north"; 

        public static South: string = "south";

        public static East: string = "east";

        public static West: string = "west";

        /**
         * parse an orientation from the outside world and alias n,s,e,w to the full names
         */
        public static parse(value: string) {
            if (value == undefined) {
                return Orientations.North;
            }

            value = value.trim();

            switch (value.toLocaleLowerCase()[0]) {
                case "s":
                case Orientations.South:
                    return Orientations.South;
                    break;
                case "e":
                case Orientations.East:
                    return Orientations.East;
                    break;
                case "w":
                case Orientations.West:
                    return Orientations.West;
                    break;
                default:
                    return Orientations.North;
                    break;
            }
        }

        

    }

}