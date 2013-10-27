

module DbDashboards.Dials {

    export class DialMask {

        _w: number;
        _h: number

        constructor(public dial: DialBase) {
            this._w = this.dial.options.prv.effectiveWidth;
            this._h = this.dial.options.prv.effectiveHeight;
        }

   
        apply(ctx: CanvasRenderingContext2D) {
            throw Error("Do not call the base apply method, must be implemented in the derived class");
        }
    }

}