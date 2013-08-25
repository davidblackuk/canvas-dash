

module DbDashboards.Dials {
    export interface PrivateOptions {
        effectiveWidth:number;
        effectiveHeight:number;
        scaleStartAngle:number;
        scaleEndAngle:number;

        needleZeroOffset;
        needleSweep;
        needleX: number;
        needleY: number;
        needleLength: number;

    }

    export interface GlassOptions {
        shape: string;
        visible: boolean;
    }

    export interface BezelOptions {
        margin:number;
        width:number;
        strokeStyle: string;
        visible: boolean;
    }

    export interface FontOptions {
        family: string;
        pixelSize: number;
        strokeStyle: string;
        fillStyle: string;
    }



    export interface TickOptions {
        strokeStyle:string;
        count:number;
        width:number;
        length:number;
    }

    export interface ScaleOptions {
        margin:number;
        strokeStyle:string;
        width:number;
        majorTicks:TickOptions;
        minorTicks:TickOptions;
        font: FontOptions;
        decimalPlaces: number;
        sideMargin:number;
    }


    export interface ValueOptions {
        min: number;
        max: number;
        decimalPlaces: number;
        value: number;
        margin: number;
        font: FontOptions;

    }

    /**
     *  Options to control the behaviour and styling of the needle
     */
    export interface NeedleOptions {

        fillStyle:string;
        strokeStyle:string;
        strokeWidth:number;
        width:number;
        margin:number;
        shadowColor:string;
        shadowBlur:number;
        shadowX:number;
        shadowY:number;

    }

    export interface FaceOptions{
        gradientColor1: string;
        gradientColor2: string;
    }

    /**
     *  Options to control the behaviour and styling of dials
     */
    export interface DialOptions {
        face: FaceOptions;
        value:ValueOptions;
        bezel:BezelOptions;
        scale:ScaleOptions;
        needle:NeedleOptions;
        glass: GlassOptions;
        type?:string;
        orientation?: string;
        prv?:PrivateOptions;

        x?: number;
        y?: number;
        width?: number;
        height?: number;
        animateIn?: boolean;


        /**
         * the 180 dial is a half circle with an additional rectangular portion below the needle (For a north facing dial).
         * This is the size of that area).
         */
        baseRunOutSize:number;
    }
}