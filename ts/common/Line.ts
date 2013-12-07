module DbDashboards.Dials {

    // Class
    export class Line {

        public start: Point;
        public end: Point;

        constructor(private x1: number, private y1: number, private x2: number, private y2: number) {
            this.start = new Point(x1, y1);
            this.end = new Point(x2, y2);

        }


    }

}
