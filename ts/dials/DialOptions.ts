

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
        /**
         * Specified the type of the dial / slider
         */
        type?:string;

        /**
         * For dials that have an orientation this takes the values North, South, East or West (or the short form N, S, E, W)
         */
        orientation?: string;

        /**
         * You don't need to know about this!
         */
        prv?:PrivateOptions;

        /**
         * Canvas x pos of the dial (used when multiple dials are on one canvas
         */
        x?: number;

        /**
         * Canvas y pos of the dial (used when multiple dials are on one canvas
         */
        y?: number;

        /**
         * Width of the dial. If not specified the dial will scale to fill the entire canvas (maintaining aspect ratio)
         */
        width?: number;

        /**
         * Height of the dial. If not specified the dial will scale to fill the entire canvas (maintaining aspect ratio)
         */
        height?: number;

        /**
         * Should we set the initial value on load or animate the dial to the value?
         */
        animateIn?: boolean;


        /**
         * the 180 dial is a half circle with an additional rectangular portion below the needle (For a north facing dial).
         * This is the size of that area).
         */
            baseRunOutSize:number;

        /**
         * Values that control the appearance of the dial face
         */
        face: FaceOptions;

        /**
         * Values that control the display of the controls current value
         */
        value:ValueOptions;

        /**
         * The bezel is the outline around the dial
         */
        bezel:BezelOptions;

        /**
         * The scale options control the number of major and minor tick, the fonts for the dial values etc
         */
        scale:ScaleOptions;

        /**
         * Options to control the 'bit that moves'
         */
        needle:NeedleOptions;

        /**
         * The glass is the top layer of the stack and tries to look like a glass sheen
         */
        glass: GlassOptions;

    }
}