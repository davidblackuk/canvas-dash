

/*
 Copyright (C) 2013 David Black and other contributors

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 associated documentation files (the "Software"), to deal in the Software without restriction,
 including without limitation the rights to use, copy, modify, merge, publish, distribute,
 sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or
 substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Base class for all dials in the kit
 */
module DbDashboards.Dials {



    export class DialBase extends DbDashboards.Common.Dashboard {

        public static Dial360: string = "dial360";
        public static Dial180: string = "dial180";
        public static Dial180N: string = "dial180N";
        public static Dial180S: string = "dial180S";
        public static Dial180E: string = "dial180E";
        public static Dial180W: string = "dial180W";
        public static Slider: string = "slider";
        public static Thermometer: string = "thermometer";



        public context: CanvasRenderingContext2D;




        // this layer contains the background and the scale and text etc
        private backgroundContext: CanvasRenderingContext2D;



        // this layer contains the bezel and the glass
        private foregroundContext: CanvasRenderingContext2D;

        // when typescript has a protected asttribute make this protected
        public needle: NeedleBase;
        public scale: ScaleBase;
        public face: DialFace;
        public glass: DialGlass;
        public options: DialOptions;
        public mask: DialMask;

        /**
         * Constructs a new DialBase
         * @param options the options for the Dial
         */
        constructor(public dialSpecificOverrides: DialOptions, public userOverrides: DialOptions, public target: JQuery, private farm: FactoryFarm) {
            super();


            this.options = this.mergeSettings(dialSpecificOverrides, userOverrides);
            this.setOrientation();



            this.context = (<any>this.target[0]).getContext("2d");

            this.backgroundContext = this.createContextForLayer(this.context, this.options.width, this.options.height);

            this.foregroundContext = this.createContextForLayer(this.context, this.options.width, this.options.height);

        }

        /**
         * Construction is really two phase as we can only initialize the various 
         * renderers once the sub class has initialized its internal sizing options
         */
        private initializeOnce() {
            this.mask = this.getMask();
            this.needle = this.farm.needleFactory.create(this.options, this.createContextForLayer(this.context, this.options.width, this.options.height));
            this.scale = this.farm.scaleFactory.create(this.options, this.backgroundContext);
            this.face = new DialFace(this, this.createContextForLayer(this.context, this.options.width, this.options.height));
            this.glass = new DialGlass(this, this.createContextForLayer(this.context, this.options.width, this.options.height));
        }


        /**
         * Sets the orientation of the dial, north is the default if not set. We take input from the outside world
         * as either north, south, east, west, or, n, s, e, w
         */
        setOrientation() {
            this.options.orientation = Orientations.parse(this.options.orientation);
        }




        /**
         * Public method called to get or set the value of the dial
         * @param value the new value (omit to bet the current value)
         * @returns {number} the new or current value
         */
        public value(value: number): number {
            if (typeof value != undefined) {
                this.setValue(value);
            }
            return this.options.value.value;
        }


        destroyInternal() {
            this.context = null;
            this.backgroundContext = null;
            this.needle.destroy();
            this.foregroundContext = null;
            this.face.destroy();
            this.glass.destroy();
            this.scale.destroy();
            this.options = null;
        }



        /**
         * Calls out to render the dial
         */
        public render() {

            this.initializeOnce();


            // todo refactor this to iterate an array of IRender

            this.mask.apply(this.face.context);
            this.mask.apply(this.backgroundContext);
            this.mask.apply(this.needle.needleContext);
            this.mask.apply(this.scale.context);
            this.mask.apply(this.foregroundContext);
            this.mask.apply(this.glass.context);

            this.face.render();

            this.scale.render();
            this.drawNeedle(this.options.value.min);

            if (this.options.glass.visible) {
                this.glass.render();
            }

            if (this.options.bezel.visible) {
                this.addBezel(this.foregroundContext);
            }

            this.renderLayers();



            if (this.options.value.value != this.options.value.min) {
                this.setValue(this.options.value.value);
            }
        }



        private setValue(v: number) {

            var vals = this.options.value;


            var original = vals.value;

            // when we initialize a dial with no value and say min = 20, max = 30, then set the value afterwards
            // to 25, the animation starts from 0 (as original value not set). causing hilarious (not) results
            // so we clamp the original in the same way we clamp the new value

            if (original < vals.min) {
                original = vals.min;
            } else if (original > vals.max) {
                original = vals.max;
            }


            if (v < vals.min) {
                v = vals.min;
            } else if (v > this.options.value.max) {
                v = vals.max;
            }
            vals.value = v;

            var sweepDelta = Math.abs(vals.value - original) / (vals.max - vals.min);


            if (0 == v) {

                this.drawNeedle(v);
                this.renderLayers();
            } else {
                $({ value: original }).animate({ value: vals.value }, {
                    duration: 1000 * sweepDelta,
                    step: (function (d: DialBase) {
                        return function (now: number, tween: any) {

                            d.drawNeedle(tween.now);
                            d.renderLayers();


                        };
                    })(this)
                })
            }


        }


        private renderLayers() {
            this.context.drawImage(this.face.canvas(), this.options.x, this.options.y);

            this.context.drawImage(this.backgroundContext.canvas, this.options.x, this.options.y);

            this.context.drawImage(this.needle.canvas(), this.options.x, this.options.y);
            this.context.drawImage(this.foregroundContext.canvas, this.options.x, this.options.y);

            this.context.drawImage(this.glass.canvas(), this.options.x, this.options.y);
        }



        /**
         * Applies a mask to the prevent glass highlights etc over flowing
         */
        getMask(): DialMask {
            throw new Error("This method must be implemented");
        }





        addBezel(ctx: CanvasRenderingContext2D) {
            throw new Error("This method must be implemented");

        }

        //addScale(ctx: CanvasRenderingContext2D) {
        //   throw new Error("This method must be implemented");

        //}


        drawNeedle(stepValue: number) {
            this.needle.render(stepValue);
            var v = new DialValue(this);
            v.render(this.needle.needleContext, stepValue, this.getDialValuePostion());
        }


        /**
         * Ask the dial where its value should be displayed
         */
        getDialValuePostion(): TranslationAndRotation {
            // silly default to make it obvious it hasnt been implemented
            var res = { x: 40, y: 40, r: Math.PI / 4 };

            return res;
        }


        /**
         * Forms the totality of the settings for a dial. These are formed of the following:
         *  The base defaults as specified below in the defaults object, overridden by:
         *      The user specified theme (or the default theme if not specified), overridden by:
         *          Any dial specific overrides (such as text placement), overridden by
         *              Any user specified values
         * @param dialSpecificDefaults conains any dial specific over rides or an empty object

         * @param userOptions (optional) can contain the user specific overrides
         */
        public mergeSettings(dialSpecificDefaults: any, userOptions: any): DialOptions {
            var coords = { x: 0, y: 0, width: this.target.width(), height: this.target.height() };
            var theme = this.getThemeFromOptions(userOptions, DialBase.themes);
            var displaySet = this.getDisplaySetFromOptions(userOptions);

            var settings = $.extend(true, coords, DialBase.defaults, {}, theme, displaySet, dialSpecificDefaults, userOptions);
            return <DialOptions>settings;
        }


        public getThemeFromOptions(options: any, themes: any) {
            if (typeof options == 'undefined' || typeof options.theme == 'undefined') {
                return {};
            }
            var name = options.theme.trim();
            if (typeof name == "string") {
                for (var t in themes) {
                    if (t == name) {
                        return themes[name];
                    }
                }
            }
            return DialBase.themes.chocolate;
        }

        public getDisplaySetFromOptions(options: any): any {
            if (typeof options.displaySet != 'undefined') {
                var name = options.displaySet.trim();
                for (var t in DialBase.settings) {
                    if (t == name) {
                        return DialBase.settings[name];
                    }
                }
            }
            return {};
        }




        public static defaults: DialOptions = {
            baseRunOutSize: 33,
            maskSubControls: true,
            face: {
                gradientColor1: "red",
                gradientColor2: "yellow"
            },
            value: {
                value: 0,
                min: 0,
                decimalPlaces: 0,
                max: 100,
                font: {
                    strokeStyle: "pink",
                    fillStyle: "red",
                    family: "Verdana",
                    pixelSize: 14
                },
                margin: 4
            },

            bezel: {
                strokeStyle: "yellow",
                width: 5,
                margin: 5,
                visible: true
            },
            needle: {
                strokeStyle: "pink",
                fillStyle: "green",
                strokeWidth: 0.5,
                width: 7,
                margin: 10,
                shadowColor: "cyan",
                shadowBlur: 1.5,
                shadowX: -1.5,
                shadowY: 1.5,
                style: DialNeedleFactory.triangle
            },
            glass: {
                shape: DialGlass.ShapeOut,
                visible: true
            },
            scale: {
                strokeStyle: "magenta",
                margin: 3,
                width: 3,
                decimalPlaces: 0,
                visible: true,
                sideMargin: 25,
                majorTicks: {
                    strokeStyle: "purple",
                    count: 7,
                    width: 2,
                    length: 7
                },
                minorTicks: {
                    strokeStyle: "orange",
                    count: 4,
                    width: 2,
                    length: 3
                }, font: {
                    strokeStyle: "pink",
                    fillStyle: "red",
                    family: "Verdana",
                    pixelSize: 12
                }
            }
        };



        public static themes: DbDashboards.Common.Themes = {
            dark: {
                face: {
                    gradientColor2: "#003",
                    gradientColor1: "#000"
                },
                value: {
                    font: {
                        fillStyle: "#fff"
                    }

                },
                bezel: {
                    strokeStyle: "rgba(126,126,255, 0.3)",
                    width: 7,
                    margin: 1
                },
                needle: {
                    fillStyle: "#fff",
                    strokeStyle: "#fff",
                    shadowColor: "#333",
                    margin: 30,
                    width: 3,
                    style: DialNeedleFactory.dart
                },
                scale: {
                    margin: 7,
                    strokeStyle: "#999",

                    majorTicks: {
                        strokeStyle: "#999"
                    },
                    minorTicks: {
                        strokeStyle: "#999"
                    },
                    font: {
                        fillStyle: "#999",

                    }
                }
            },
            blue: {
                face: {
                    gradientColor1: "#00d",
                    gradientColor2: "#003"
                },
                value: {
                    font: {
                        strokeStyle: "#85C2FF",
                        fillStyle: "#99e"
                    }
                },
                bezel: {
                    strokeStyle: "rgba(0,0,0,0)",
                    width: 1.5,
                    margin: 2
                },
                needle: {
                    fillStyle: "#CBCBF7",
                    strokeStyle: "rgba(0,0,0,0)",
                    strokeWidth: 1,
                    width: 4,
                    margin: 20,
                    shadowColor: "#333",
                    style: DialNeedleFactory.circleArrow
                },
                scale: {
                    strokeStyle: "#99e",
                    majorTicks: {
                        strokeStyle: "#99e",
                        length: 10
                    },
                    minorTicks: {
                        strokeStyle: "#99e",
                        length: 5
                    },
                    font: {
                        strokeStyle: "#B8CEFC",
                        fillStyle: "#B8CEFC"
                    },
                    width: 8,
                    margin: 3
                }
            },
            chocolate: {
                face: {
                    gradientColor1: "black",
                    gradientColor2: "brown"
                },
                value: {
                    font: {
                        strokeStyle: "#EBD6CC",
                        fillStyle: "#EBD6CC"
                    }
                },
                bezel: {
                    strokeStyle: "#AD5C33"
                },
                needle: {
                    fillStyle: "#DEC7A2",
                    strokeStyle: "#DEC7A2",
                    shadowColor: "#333",
                    style: DialNeedleFactory.arrow,
                    width: 3,
                    margin: 20
                },
                scale: {
                    strokeStyle: "#C28566",
                    majorTicks: {
                        strokeStyle: "brown"
                    },
                    minorTicks: {
                        strokeStyle: "#FFFFE0"
                    },
                    font: {
                        strokeStyle: "#D4AA94",
                        fillStyle: "#D4AA94"
                    }
                }

            },
            metro: {


                glass: {
                    visible: false
                },
                face: {

                    gradientColor1: "#2881E3",
                    gradientColor2: "#2881E3"
                },
                value: {
                    font: {
                        strokeStyle: "#FFFFFF",
                        fillStyle: "#FFFFFF"
                    }
                },

                bezel: {
                    visible: false,
                    width: 0

                },
                needle: {
                    fillStyle: "#FFFFFF",
                    strokeStyle: "#ffffff",
                    shadowColor: "rgba(0,0,0,0)",
                    style: DialNeedleFactory.line,
                    width: 3,
                    margin: 20

                },
                scale: {
                    sideMargin: 15,
                    strokeStyle: "#FFFFFF",
                    majorTicks: {
                        strokeStyle: "#FFFFFF"
                    },
                    minorTicks: {
                        strokeStyle: "#FFFFFF"
                    }, font: {
                        strokeStyle: "#FFFFFF",
                        fillStyle: "#FFFFFF",
                        family: "Helvetica"
                    }
                }


            },
            paper: {
                glass: {
                    visible: false
                }, face: {
                    gradientColor1: "#DCE0CE",
                    gradientColor2: "#DCE0CE"
                },
                value: {
                    font: {
                        strokeStyle: "#444444",
                        fillStyle: "#444444"
                    }
                },
                bezel: {
                    strokeStyle: "#555555",
                    margin: 4
                },
                needle: {
                    fillStyle: "#ffffff",
                    strokeStyle: "#000",
                    shadowColor: "rgba(0,0,0,0)",
                    style: DialNeedleFactory.dot,
                    width: 5,
                    margin: 10
                },
                scale: {
                    strokeStyle: "#000000",
                    margin: 6,
                    majorTicks: {
                        strokeStyle: "#444444"
                    },
                    minorTicks: {
                        strokeStyle: "#888888"
                    },
                    font: {
                        strokeStyle: "#000",
                        fillStyle: "#000"
                    }
                }

            },
        };

        public static settings = {
            medium: {
                baseRunOutSize: 22,
                value: {
                    font: {
                        pixelSize: 10
                    },
                    margin: 5
                },

                bezel: {
                    width: 3,
                    margin: 1.5
                },
                scale: {
                    margin: 1,
                    width: 2,
                    majorTicks: {
                        count: 5,
                        length: 3
                    },
                    minorTicks: {
                        count: 5,
                        length: 1.5
                    },
                    font: {
                        pixelSize: 8
                    }

                },
                needle: {
                    margin: 4,
                    width: 3
                }
            },
            small: {
                baseRunOutSize: 12,
                value: {
                    font: {
                        pixelSize: 7
                    },
                    margin: 2
                },

                bezel: {
                    width: 1,
                    margin: 0.5
                },
                scale: {
                    margin: 0.5,
                    width: 1,
                    majorTicks: {
                        count: 5,
                        length: 3
                    },
                    minorTicks: {
                        count: 5,
                        length: 1.5
                    },
                    font: {
                        pixelSize: 8,
                        fillStyle: "rgba(0,0,0,0)",
                        strokeStyle: "rgba(0,0,0,0)"
                    }

                },
                needle: {
                    margin: 4,
                    width: 2
                }
            }
        };


    }
}