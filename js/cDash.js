var DbDashboards;
(function (DbDashboards) {
    /// <reference path="../d/jquery-1.9.1.d.ts" />
    (function (Common) {
        var Dashboard = (function () {
            function Dashboard() {
            }
            /**
            * create a background layer canvas and return the context
            * @param srcContext the source context to take the width and height from (or null to use only the padding)
            * @param xPadding extra pixels to add to the width of the canvas (or to 0 if the source context is null)
            * @param yPadding extra pixels to add to the height of the canvas (or to 0 if the source context is null)
            * @returns {CanvasRenderingContext2D}
            */
            Dashboard.prototype.createLayerContext = function (srcContext, xPadding, yPadding) {
                var buffer = document.createElement('canvas');
                var w = (srcContext != null) ? srcContext.canvas.width : 0;
                var h = (srcContext != null) ? srcContext.canvas.height : 0;
                buffer.width = w + xPadding;
                buffer.height = h + yPadding;
                return buffer.getContext("2d");
            };

            Dashboard.prototype.destroy = function () {
                var t = 0;
                this.destroyInternal();
            };

            /**
            * Over ride in the derived class to free up resources
            */
            Dashboard.prototype.destroyInternal = function () {
            };

            Dashboard.checkParameters = function (commandString, options) {
                var res = {
                    commandString: "",
                    options: {}
                };

                if (typeof commandString === "object") {
                    res.options = commandString;
                } else if (typeof commandString === 'string') {
                    res.commandString = commandString;
                    if (typeof options != "undefined") {
                        res.options = options;
                    }
                }

                // set the default ID if not specified
                res.options = $.extend({ id: "dbDashboard" }, res.options);

                return res;
            };
            return Dashboard;
        })();
        Common.Dashboard = Dashboard;
    })(DbDashboards.Common || (DbDashboards.Common = {}));
    var Common = DbDashboards.Common;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    /// <reference path="DialOptions.ts" />
    /// <reference path="DialBase.ts" />
    /// <reference path="Dial180.ts" />
    (function (Dials) {
        var DialBezel = (function () {
            function DialBezel(dial) {
                this.dial = dial;
            }
            DialBezel.prototype.addLayer = function (ctx) {
                var w = this.dial.options.prv.effectiveWidth;
                var h = this.dial.options.prv.effectiveHeight;

                var offset = (this.dial.options.bezel.width / 2) + this.dial.options.bezel.margin;

                ctx.beginPath();
                ctx.strokeStyle = this.dial.options.bezel.strokeStyle;
                ctx.lineWidth = this.dial.options.bezel.width;

                switch (this.dial.options.type) {
                    case Dials.DialBase.Dial360:
                        ctx.arc(this.dial.options.prv.effectiveWidth / 2, this.dial.options.prv.effectiveHeight / 2, (w / 2) - offset, 0, Math.PI * 2, false);
                        break;

                    case Dials.DialBase.Dial180N:
                        ctx.moveTo(w / 2, (h / 2) - offset + this.dial.options.baseRunOutSize);
                        ctx.lineTo(offset, (h / 2) - offset + this.dial.options.baseRunOutSize);
                        ctx.lineTo(offset, h / 2 - offset);
                        ctx.arc(w / 2, h / 2, (w / 2) - offset, Math.PI, 0, false);
                        ctx.lineTo(w - offset, (h / 2) - offset + this.dial.options.baseRunOutSize);
                        ctx.closePath();
                        break;
                    case Dials.DialBase.Dial180S:
                        ctx.moveTo(offset, offset);
                        ctx.lineTo(offset, this.dial.options.baseRunOutSize + offset);
                        ctx.arc(w / 2, this.dial.options.baseRunOutSize, (w / 2) - offset, Math.PI, 0, true);
                        ctx.lineTo(w - offset, offset);
                        ctx.lineTo(offset, offset);
                        break;
                    case Dials.DialBase.Dial180E:
                        ctx.moveTo(offset, offset);
                        ctx.lineTo(this.dial.options.baseRunOutSize + offset, offset);
                        ctx.arc(this.dial.options.baseRunOutSize, h / 2, (h / 2) - offset, 3 * Math.PI / 2, Math.PI / 2, false);
                        ctx.lineTo(offset, h - offset);
                        ctx.lineTo(offset, offset);
                        break;
                    case Dials.DialBase.Dial180W:
                        ctx.moveTo(w - offset, offset);
                        ctx.lineTo(w - offset, h - offset);
                        ctx.lineTo((w - this.dial.options.baseRunOutSize) - offset, h - offset);
                        ctx.arc(w - this.dial.options.baseRunOutSize, h / 2, (h / 2) - offset, Math.PI / 2, 3 * Math.PI / 2, false);
                        ctx.lineTo(w - offset, offset);
                        break;
                }
                ctx.closePath();
                ctx.stroke();
            };
            return DialBezel;
        })();
        Dials.DialBezel = DialBezel;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    /// <reference path="DialOptions.ts" />
    /// <reference path="DialBase.ts" />
    (function (Dials) {
        var DialFace = (function () {
            function DialFace(dial) {
                this.dial = dial;
            }
            DialFace.prototype.addLayer = function (ctx) {
                var w = this.dial.options.prv.effectiveWidth;
                var h = this.dial.options.prv.effectiveHeight;

                var gf = ctx.createLinearGradient(w / 2, h, w / 2, 0);
                gf.addColorStop(0, this.dial.options.face.gradientColor2);
                gf.addColorStop(1, this.dial.options.face.gradientColor1);
                ctx.fillStyle = gf;

                ctx.fillRect(0, 0, w, h + this.dial.options.baseRunOutSize);
            };
            return DialFace;
        })();
        Dials.DialFace = DialFace;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    /// <reference path="DialOptions.ts" />
    /// <reference path="DialBase.ts" />
    (function (Dials) {
        var DialGlass = (function () {
            function DialGlass(dial) {
                this.dial = dial;
            }
            DialGlass.prototype.addLayer = function (ctx) {
                var w = this.dial.options.prv.effectiveWidth;
                var h = this.dial.options.prv.effectiveHeight;
                ctx.beginPath();
                ctx.fillStyle = "rgba(255,255,255,0.2)";

                if (this.dial.options.glass.shape == DialGlass.ShapeInOut) {
                    ctx.moveTo(-10, h);
                    ctx.quadraticCurveTo(10, h / 2, (w / 2) * 0.8, h / 2);
                    ctx.quadraticCurveTo(w * 0.8, (h / 2) * 1.1, w * 0.8, -10);
                } else if (this.dial.options.glass.shape == DialGlass.ShapeOut) {
                    ctx.moveTo(-10, (h / 2) * 1.3);
                    ctx.quadraticCurveTo(50, 0, w * 1.1, (h / 2) * 0.7);
                    ctx.lineTo(w * 1.1, -10);
                }
                ctx.lineTo(-10, -10);

                // complete custom shape
                ctx.closePath();
                ctx.fill();
            };
            DialGlass.ShapeInOut = "inOut";
            DialGlass.ShapeOut = "out";
            DialGlass.ShapeNone = "none";
            return DialGlass;
        })();
        Dials.DialGlass = DialGlass;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    /// <reference path="DialOptions.ts" />
    /// <reference path="DialBase.ts" />
    /// <reference path="Dial180.ts" />
    (function (Dials) {
        var DialMask = (function () {
            function DialMask(dial) {
                this.dial = dial;
            }
            DialMask.prototype.addLayer = function (ctx) {
                var w = this.dial.options.prv.effectiveWidth;
                var h = this.dial.options.prv.effectiveHeight;

                switch (this.dial.options.type) {
                    case Dials.DialBase.Dial360:
                        ctx.arc(w / 2, h / 2, (w / 2), 0, Math.PI * 2, false);

                        ctx.clip();
                        break;
                    case Dials.DialBase.Dial180N:
                        ctx.beginPath();
                        ctx.moveTo(w / 2, (h / 2) + this.dial.options.baseRunOutSize);
                        ctx.lineTo(0, (h / 2) + this.dial.options.baseRunOutSize);
                        ctx.lineTo(0, h / 2);
                        ctx.arc(w / 2, h / 2, w / 2, Math.PI, 0, false);
                        ctx.lineTo(w, (h / 2) + this.dial.options.baseRunOutSize);
                        ctx.closePath();
                        ctx.clip();
                        break;
                    case Dials.DialBase.Dial180S:
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(0, this.dial.options.baseRunOutSize);
                        ctx.arc(w / 2, this.dial.options.baseRunOutSize, w / 2, Math.PI, 0, true);
                        ctx.lineTo(w, 0);
                        ctx.lineTo(0, 0);
                        ctx.closePath();
                        ctx.clip();
                        break;
                    case Dials.DialBase.Dial180E:
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(this.dial.options.baseRunOutSize, 0);
                        ctx.arc(this.dial.options.baseRunOutSize, h / 2, h / 2, 3 * Math.PI / 2, Math.PI / 2, false);
                        ctx.lineTo(0, h);
                        ctx.lineTo(0, 0);
                        ctx.closePath();
                        ctx.clip();
                        break;
                    case Dials.DialBase.Dial180W:
                        ctx.beginPath();
                        ctx.moveTo(w, 0);
                        ctx.lineTo(w, h);
                        ctx.lineTo(w - this.dial.options.baseRunOutSize, h);
                        ctx.arc(w - this.dial.options.baseRunOutSize, h / 2, h / 2, Math.PI / 2, 3 * Math.PI / 2, false);
                        ctx.lineTo(w, 0);
                        ctx.closePath();
                        ctx.clip();
                        break;
                }
            };
            return DialMask;
        })();
        Dials.DialMask = DialMask;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    /// <reference path="DialOptions.ts" />
    /// <reference path="DialBase.ts" />
    (function (Dials) {
        var DialNeedle = (function () {
            function DialNeedle(dial) {
                this.dial = dial;
            }
            DialNeedle.prototype.addLayer = function (ctx, stepValue) {
                var cx = this.dial.options.prv.needleX;
                var cy = this.dial.options.prv.needleY;
                var hw = this.dial.options.needle.width - (this.dial.options.needle.strokeWidth / 2);
                var nt = this.dial.options.bezel.margin + this.dial.options.bezel.width / 2 + this.dial.options.needle.margin;
                var needleLength = this.dial.options.prv.needleLength - nt;

                var normaized = (stepValue - this.dial.options.value.min) / (this.dial.options.value.max - this.dial.options.value.min);

                var zeroAngle = this.dial.options.prv.needleZeroOffset;
                var angle = zeroAngle + (normaized * this.dial.options.prv.needleSweep);

                // rotate canvas to rotate needle
                ctx.translate(cx, cy);
                ctx.rotate(angle);
                ctx.translate(-cx, -cy);

                ctx.beginPath();

                ctx.strokeStyle = this.dial.options.needle.strokeStyle;
                ctx.lineWidth = this.dial.options.needle.strokeWidth;
                ctx.fillStyle = this.dial.options.needle.fillStyle;

                ctx.moveTo(cx, cy);
                ctx.lineTo(cx - hw, cy);
                ctx.lineTo(cx, cy - needleLength);
                ctx.lineTo(cx + hw, cy);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // restore canvas rotation
                ctx.translate(cx, cy);
                ctx.rotate(-angle);
                ctx.translate(-cx, -cy);
            };
            return DialNeedle;
        })();
        Dials.DialNeedle = DialNeedle;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    /// <reference path="DialOptions.ts" />
    /// <reference path="DialBase.ts" />
    (function (Dials) {
        var DialScale = (function () {
            function DialScale(dial) {
                this.dial = dial;
            }
            DialScale.prototype.addLayer = function (ctx) {
                var c = this.getMetrics();

                this.drawMajorTicks(ctx, c);
                this.drawScaleBand(ctx, c);
                this.drawScaleValues(ctx, c);
            };

            /**
            * draws the minor ticks for a single major tick division
            * @param target jquery canvas target
            * @param metrics dial metrics
            * @param angle the start angle of the major tick
            */
            DialScale.prototype.drawMinorTicks = function (ctx, metrics, angle) {
                ctx.beginPath();
                ctx.strokeStyle = this.dial.options.scale.minorTicks.strokeStyle;
                ctx.lineWidth = this.dial.options.scale.minorTicks.width;

                for (var min = 0; min < this.dial.options.scale.minorTicks.count + 1; min++) {
                    var majStep = metrics.step;
                    var minStep = majStep / (this.dial.options.scale.minorTicks.count + 1);
                    var stepAngle = angle + min * minStep;
                    var minorOuter = this.pointOnCircle(metrics.x, metrics.y, metrics.w + this.dial.options.scale.width / 2, stepAngle);
                    var minorInner = this.pointOnCircle(metrics.x, metrics.y, metrics.w - (this.dial.options.scale.width / 2) - this.dial.options.scale.minorTicks.length, stepAngle);

                    ctx.moveTo(minorInner.x, minorInner.y);
                    ctx.lineTo(minorOuter.x, minorOuter.y);
                }
                ctx.closePath();
                ctx.stroke();
            };

            /**
            * draws the major tick lines for the dial
            * @param target jQuery target to render to
            * @param metrics the metrics for the dial
            */
            DialScale.prototype.drawMajorTicks = function (ctx, metrics) {
                for (var maj = 0; maj < this.dial.options.scale.majorTicks.count; maj++) {
                    var angle = (metrics.startAngle + (maj * metrics.step));
                    var majorOuter = this.pointOnCircle(metrics.x, metrics.y, metrics.w + this.dial.options.scale.width / 2, angle);
                    var majorInner = this.pointOnCircle(metrics.x, metrics.y, metrics.w - (this.dial.options.scale.width / 2) - this.dial.options.scale.majorTicks.length, angle);

                    if (maj < this.dial.options.scale.majorTicks.count - 1) {
                        this.drawMinorTicks(ctx, metrics, angle);
                    }
                    ctx.beginPath();
                    ctx.strokeStyle = this.dial.options.scale.majorTicks.strokeStyle;
                    ctx.lineWidth = this.dial.options.scale.majorTicks.width;
                    ctx.moveTo(majorInner.x, majorInner.y);
                    ctx.lineTo(majorOuter.x, majorOuter.y);
                    ctx.closePath();
                    ctx.stroke();
                }
            };

            DialScale.prototype.drawScaleValues = function (ctx, metrics) {
                ctx.font = this.dial.options.scale.font.pixelSize + "px " + this.dial.options.scale.font.family;

                for (var maj = 0; maj < this.dial.options.scale.majorTicks.count; maj++) {
                    var angle = (metrics.startAngle + (maj * metrics.step));

                    var fontRadius = metrics.w - (this.dial.options.scale.width / 2);
                    fontRadius -= this.dial.options.scale.majorTicks.length;
                    fontRadius -= this.dial.options.scale.font.pixelSize;

                    var centerText = this.pointOnCircle(metrics.x, metrics.y, fontRadius, angle);

                    ctx.fillStyle = this.dial.options.scale.font.fillStyle;
                    ctx.strokeStyle = this.dial.options.scale.font.strokeStyle;
                    var stepValue = ((this.dial.options.value.max - this.dial.options.value.min) / (this.dial.options.scale.majorTicks.count - 1)) * maj;

                    var txt = $.number(stepValue + this.dial.options.value.min, this.dial.options.scale.decimalPlaces);

                    ctx.lineWidth = 1;

                    angle = (3 * Math.PI) / 2 - (Math.PI - angle);

                    ctx.save();
                    ctx.textAlign = "center";
                    ctx.translate(centerText.x, centerText.y);
                    ctx.rotate(angle);
                    ctx.fillText(txt, 0, 0);

                    ctx.restore();
                }
            };

            /**
            * draw the outer scale band
            * @param ctx
            * @param metrics
            */
            DialScale.prototype.drawScaleBand = function (ctx, metrics) {
                ctx.beginPath();

                ctx.strokeStyle = this.dial.options.scale.strokeStyle;
                ctx.lineWidth = this.dial.options.scale.width;
                ctx.arc(metrics.x, metrics.y, metrics.w, metrics.startAngle, metrics.endAngle, false);
                ctx.stroke();
                ctx.closePath();
            };

            /**
            * Calculates the x,y coordinates of a point on the circumference
            * a circle.
            * @param cx the origin of the circle's x coordinate
            * @param cy the origin of the circle's y coordinate
            * @param radius of the circle
            * @param angle (in degrees of the point around the circle)
            * @returns {{x: number, y: number}}
            */
            DialScale.prototype.pointOnCircle = function (cx, cy, radius, angle) {
                return {
                    x: cx + radius * Math.cos(angle),
                    y: cy + radius * Math.sin(angle)
                };
            };

            DialScale.prototype.getMetrics = function () {
                var bezelInnerEdge = this.dial.options.bezel.margin + (this.dial.options.bezel.width);
                var scaleInnerEdge = this.dial.options.scale.margin + (this.dial.options.scale.width / 2);
                var offset = 0;

                var c = {
                    x: this.dial.options.prv.effectiveWidth / 2,
                    y: this.dial.options.prv.effectiveHeight / 2,
                    w: this.dial.options.prv.effectiveWidth / 2 - (bezelInnerEdge + scaleInnerEdge),
                    startAngle: this.dial.options.prv.scaleStartAngle,
                    endAngle: this.dial.options.prv.scaleEndAngle,
                    step: 0
                };

                c.step = (Math.PI * 2 - (c.startAngle - c.endAngle)) / (this.dial.options.scale.majorTicks.count - 1);

                switch (this.dial.options.type) {
                    case Dials.DialBase.Dial360:
                        break;
                    case Dials.DialBase.Dial180N:
                        break;
                    case Dials.DialBase.Dial180S:
                        c.y = this.dial.options.baseRunOutSize;
                        c.step = (c.endAngle - c.startAngle) / (this.dial.options.scale.majorTicks.count - 1);
                        break;
                    case Dials.DialBase.Dial180E:
                        c.x = this.dial.options.prv.needleX;
                        c.y = this.dial.options.prv.needleY;
                        break;
                    case Dials.DialBase.Dial180W:
                        c.w = this.dial.options.prv.effectiveHeight / 2 - (bezelInnerEdge + scaleInnerEdge);
                        c.step = (c.endAngle - c.startAngle) / (this.dial.options.scale.majorTicks.count - 1);
                        c.x = this.dial.options.prv.needleX;
                        c.y = this.dial.options.prv.needleY;
                        break;
                }

                return c;
            };
            DialScale.piOver180 = Math.PI / 180;
            return DialScale;
        })();
        Dials.DialScale = DialScale;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    /// <reference path="../d/jquery-1.9.1.d.ts" />
    /// <reference path="../d/jquery.number.d.ts" />
    /// <reference path="DialOptions.ts" />
    /// <reference path="DialBase.ts" />
    (function (Dials) {
        var DialValue = (function () {
            function DialValue(dial) {
                this.dial = dial;
            }
            DialValue.prototype.addLayer = function (ctx, stepValue) {
                ctx.font = this.dial.options.value.font.pixelSize + "px " + this.dial.options.value.font.family;

                ctx.fillStyle = this.dial.options.value.font.fillStyle;
                ctx.strokeStyle = this.dial.options.value.font.strokeStyle;

                var txt = $.number(stepValue, this.dial.options.value.decimalPlaces);

                var ty = 0;
                var tx = 0;
                var r = 0;

                switch (this.dial.options.type) {
                    case Dials.DialBase.Dial360:
                        tx = (this.dial.options.prv.effectiveWidth / 2);
                        ty = (this.dial.options.prv.effectiveHeight - (this.dial.options.bezel.margin + this.dial.options.bezel.width / 2));
                        ty = ty - this.dial.options.value.margin;
                        break;
                    case Dials.DialBase.Dial180N:
                        tx = (this.dial.options.prv.effectiveWidth / 2);
                        ty = this.dial.options.prv.needleY + this.dial.options.value.font.pixelSize + this.dial.options.needle.width;
                        break;
                    case Dials.DialBase.Dial180S:
                        tx = this.dial.options.prv.effectiveWidth / 2;
                        ty = this.dial.options.prv.needleY - this.dial.options.needle.width - 3;
                        break;
                    case Dials.DialBase.Dial180E:
                        tx = this.dial.options.prv.needleX - this.dial.options.value.font.pixelSize - this.dial.options.needle.width;

                        ty = this.dial.options.prv.effectiveHeight / 2;
                        r = Math.PI / 2;
                        break;
                    case Dials.DialBase.Dial180W:
                        tx = this.dial.options.prv.needleX + this.dial.options.value.font.pixelSize + this.dial.options.needle.width;
                        ty = this.dial.options.prv.effectiveHeight / 2;
                        r = 3 * Math.PI / 2;
                        break;
                    case Dials.DialBase.Slider:
                        switch (this.dial.options.orientation) {
                            case Dials.DialBase.North:
                                tx = (this.dial.options.prv.effectiveWidth / 2);
                                var bezOffset = (this.dial.options.bezel.width / 2) + this.dial.options.bezel.margin;
                                ty = this.dial.options.height - (bezOffset + (this.dial.options.value.font.pixelSize / 2));
                                break;
                            case Dials.DialBase.South:
                                tx = (this.dial.options.prv.effectiveWidth / 2);
                                var bezOffset = (this.dial.options.bezel.width / 2) + this.dial.options.bezel.margin;
                                ty = (bezOffset + (this.dial.options.value.font.pixelSize));
                                ty += this.dial.options.value.margin;
                                break;
                            case Dials.DialBase.East:
                                ty = (this.dial.options.prv.effectiveHeight / 2);
                                var bezOffset = (this.dial.options.bezel.width / 2) + this.dial.options.bezel.margin;
                                tx = (bezOffset + (this.dial.options.value.font.pixelSize)) + 2;
                                break;
                            case Dials.DialBase.West:
                                ty = (this.dial.options.prv.effectiveHeight / 2);
                                var bezOffset = (this.dial.options.bezel.width / 2) + this.dial.options.bezel.margin;
                                tx = this.dial.options.width - (bezOffset + (this.dial.options.value.font.pixelSize) + 2);
                                break;
                        }
                        r = 0;
                        break;
                }

                ctx.textAlign = "center";
                ctx.translate(tx, ty);
                ctx.rotate(r);
                ctx.translate(-tx, -ty);

                ctx.fillText(txt, tx, ty);

                ctx.translate(tx, ty);
                ctx.rotate(-r);
                ctx.translate(-tx, -ty);
            };
            return DialValue;
        })();
        Dials.DialValue = DialValue;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    /// <reference path="DialOptions.ts" />
    /// <reference path="DialBase.ts" />
    /// <reference path="Dial180.ts" />
    (function (Dials) {
        var SliderBezel = (function () {
            function SliderBezel(dial) {
                this.dial = dial;
            }
            SliderBezel.prototype.addLayer = function (ctx) {
                var w = this.dial.options.prv.effectiveWidth;
                var h = this.dial.options.prv.effectiveHeight;

                var offset = (this.dial.options.bezel.width / 2) + this.dial.options.bezel.margin;

                ctx.beginPath();
                ctx.strokeStyle = this.dial.options.bezel.strokeStyle;
                ctx.lineWidth = this.dial.options.bezel.width;

                ctx.rect(offset, offset, w - 2 * offset, h - 2 * offset);

                ctx.closePath();
                ctx.stroke();
            };
            return SliderBezel;
        })();
        Dials.SliderBezel = SliderBezel;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    /// <reference path="DialOptions.ts" />
    /// <reference path="DialBase.ts" />
    (function (Dials) {
        var SliderScale = (function () {
            function SliderScale(dial) {
                this.dial = dial;
                this.options = dial.options.scale;
            }
            SliderScale.prototype.addLayer = function (ctx) {
                this.getMetrics();

                this.drawMajorTicks(ctx);
                this.drawScaleBand(ctx);
                this.drawScaleValues(ctx);
            };

            SliderScale.prototype.drawMinorTicks = function (ctx, step) {
                for (var min = 0; min < this.options.minorTicks.count; min++) {
                    switch (this.dial.options.orientation) {
                        case Dials.DialBase.North:
                            var start = this.scaleBandX1 + (this.majorTickSpacing * step);
                            var x1 = start + (this.minorTickSpacing * min);
                            var y1 = this.scaleBandY1;
                            var x2 = x1;
                            var y2 = y1 + this.options.minorTicks.length + this.options.majorTicks.width;
                            break;
                        case Dials.DialBase.South:
                            var start = this.scaleBandX1 + (this.majorTickSpacing * step);
                            var x1 = start + (this.minorTickSpacing * min);
                            var y1 = this.scaleBandY1;
                            var x2 = x1;
                            var y2 = y1 - (this.options.minorTicks.length + this.options.majorTicks.width);
                            break;
                        case Dials.DialBase.West:
                            var start = this.scaleBandY1 + (this.majorTickSpacing * step);
                            var x1 = this.scaleBandX1;
                            var y1 = start + (this.minorTickSpacing * min);
                            var x2 = this.scaleBandX1 + this.options.minorTicks.length + this.options.majorTicks.width;
                            var y2 = y1;

                            break;
                        case Dials.DialBase.East:
                            var start = this.scaleBandY1 + (this.majorTickSpacing * step);
                            var x1 = this.scaleBandX1;
                            var y1 = start + (this.minorTickSpacing * min);
                            var x2 = this.scaleBandX1 - (this.options.minorTicks.length + this.options.majorTicks.width);
                            var y2 = y1;
                            break;
                    }

                    ctx.beginPath();
                    ctx.strokeStyle = this.options.minorTicks.strokeStyle;
                    ctx.lineWidth = this.options.minorTicks.width;
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }
            };

            /**
            * draws the major tick lines for the dial
            * @param target jQuery target to render to
            * @param metrics the metrics for the dial
            */
            SliderScale.prototype.drawMajorTicks = function (ctx) {
                for (var maj = 0; maj < this.options.majorTicks.count; maj++) {
                    switch (this.dial.options.orientation) {
                        case Dials.DialBase.North:
                            var x1 = this.scaleBandX1 + (this.majorTickSpacing * maj);
                            var y1 = this.scaleBandY1;
                            var x2 = x1;
                            var y2 = y1 + this.options.majorTicks.length + this.options.width;
                            break;
                        case Dials.DialBase.South:
                            var x1 = this.scaleBandX1 + (this.majorTickSpacing * maj);
                            var y1 = this.scaleBandY1;
                            var x2 = x1;
                            var y2 = y1 - (this.options.majorTicks.length + this.options.width);
                            break;
                        case Dials.DialBase.West:
                            var x1 = this.scaleBandX1;
                            var y1 = this.scaleBandY1 + (this.majorTickSpacing * maj);
                            var x2 = this.scaleBandX1 + this.options.majorTicks.length + this.options.width;
                            var y2 = y1;

                            break;
                        case Dials.DialBase.East:
                            var x1 = this.scaleBandX1;
                            var y1 = this.scaleBandY1 + (this.majorTickSpacing * maj);
                            var x2 = this.scaleBandX1 - (this.options.majorTicks.length + +this.options.width);
                            var y2 = y1;
                            break;
                    }

                    if (maj < this.options.majorTicks.count - 1) {
                        this.drawMinorTicks(ctx, maj);
                    }
                    ctx.beginPath();
                    ctx.strokeStyle = this.options.majorTicks.strokeStyle;
                    ctx.lineWidth = this.options.majorTicks.width;
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }
            };

            SliderScale.prototype.drawScaleValues = function (ctx) {
                ctx.save();
                ctx.font = this.options.font.pixelSize + "px " + this.options.font.family;
                ctx.fillStyle = this.options.font.fillStyle;
                ctx.strokeStyle = this.options.font.strokeStyle;
                ctx.lineWidth = 1;
                var x, y = 0;

                ctx.textAlign = "center";

                for (var maj = 0; maj < this.options.majorTicks.count; maj++) {
                    var stepValue = ((this.dial.options.value.max - this.dial.options.value.min) / (this.options.majorTicks.count - 1)) * maj;
                    var txt = $.number(stepValue + this.dial.options.value.min, this.options.decimalPlaces);
                    var r = 0;
                    switch (this.dial.options.orientation) {
                        case Dials.DialBase.North:
                            x = this.options.sideMargin + (this.majorTickSpacing * maj);
                            y = this.scaleY + this.options.width + this.options.margin + this.options.majorTicks.length + this.options.font.pixelSize / 2;
                            break;
                        case Dials.DialBase.South:
                            x = this.options.sideMargin + (this.majorTickSpacing * maj);
                            y = this.dial.options.height - (this.scaleY + this.options.width + this.options.margin + this.options.majorTicks.length - 3);
                            break;
                        case Dials.DialBase.East:
                            x = this.dial.options.width - (this.scaleY + this.options.width + this.options.margin + this.options.majorTicks.length + this.options.font.pixelSize / 2);
                            y = this.options.sideMargin + (this.majorTickSpacing * maj);
                            r = Math.PI / 2;
                            break;
                        case Dials.DialBase.West:
                            x = (this.scaleY + this.options.width + this.options.margin + this.options.majorTicks.length) + this.options.font.pixelSize / 2;
                            y = this.options.sideMargin + (this.majorTickSpacing * maj);
                            r = -Math.PI / 2;
                            break;
                    }
                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(r);
                    ctx.fillText(txt, 0, 0);
                    ctx.restore();
                }
                ctx.restore();
            };

            /**
            * draw the outer scale band
            * @param ctx
            * @param metrics
            */
            SliderScale.prototype.drawScaleBand = function (ctx) {
                ctx.beginPath();

                ctx.strokeStyle = this.options.strokeStyle;
                ctx.lineWidth = this.options.width;
                ctx.moveTo(this.scaleBandX1, this.scaleBandY1);
                ctx.lineTo(this.scaleBandX2, this.scaleBandY2);
                ctx.stroke();
                ctx.closePath();
            };

            SliderScale.prototype.getMetrics = function () {
                this.scaleBandX1 = 0;
                this.scaleBandX2 = 0;
                this.scaleBandY1 = 0;
                this.scaleBandY2 = 0;

                this.scaleY = this.dial.options.bezel.margin + this.dial.options.bezel.width + this.options.margin + (this.options.width);

                switch (this.dial.options.orientation) {
                    case Dials.DialBase.North:
                        this.scaleBandX1 = this.options.sideMargin;
                        this.scaleBandY1 = this.dial.options.bezel.margin + this.dial.options.bezel.width + this.options.margin + (this.options.width);
                        this.scaleBandX2 = this.dial.options.width - this.options.sideMargin;
                        this.scaleBandY2 = this.scaleBandY1;
                        this.majorTickSpacing = (this.scaleBandX2 - this.scaleBandX1) / (this.options.majorTicks.count - 1);
                        break;
                    case Dials.DialBase.South:
                        this.scaleBandX1 = this.options.sideMargin;
                        this.scaleBandY1 = this.dial.options.height - (this.dial.options.bezel.margin + this.dial.options.bezel.width + this.options.margin + (this.options.width));
                        this.scaleBandX2 = this.dial.options.width - this.options.sideMargin;
                        this.scaleBandY2 = this.scaleBandY1;
                        this.majorTickSpacing = (this.scaleBandX2 - this.scaleBandX1) / (this.options.majorTicks.count - 1);
                        break;
                    case Dials.DialBase.West:
                        this.scaleBandX1 = (this.dial.options.bezel.margin + this.dial.options.bezel.width + this.options.margin + (this.options.width));
                        this.scaleBandY1 = this.options.sideMargin;
                        this.scaleBandX2 = this.scaleBandX1;
                        this.scaleBandY2 = this.dial.options.height - this.options.sideMargin;
                        this.majorTickSpacing = (this.scaleBandY2 - this.scaleBandY1) / (this.options.majorTicks.count - 1);
                        break;
                    case Dials.DialBase.East:
                        this.scaleBandX1 = this.dial.options.width - (this.dial.options.bezel.margin + this.dial.options.bezel.width + this.options.margin + (this.options.width));
                        this.scaleBandY1 = this.options.sideMargin;
                        this.scaleBandX2 = this.scaleBandX1;
                        this.scaleBandY2 = this.dial.options.height - this.options.sideMargin;
                        this.majorTickSpacing = (this.scaleBandY2 - this.scaleBandY1) / (this.options.majorTicks.count - 1);
                        break;
                }

                this.scaleInnerEdge = this.options.sideMargin + this.scaleY;
                this.scaleOuterEdge = this.dial.options.prv.effectiveWidth - this.scaleInnerEdge;

                //            this.majorTickSpacing = (this.scaleOuterEdge-this.scaleInnerEdge)/(this.options.majorTicks.count-1);
                this.minorTickSpacing = this.majorTickSpacing / this.options.minorTicks.count;
            };
            return SliderScale;
        })();
        Dials.SliderScale = SliderScale;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Marquees) {
        var Characters = (function () {
            function Characters() {
                /**
                *  Maps characters to the bitmaps that form their shape. Characters are rendered
                *  as 6x8 dots. Currently the character set is limited to fairly traditional ASCII
                *  style characters (a..z A..9 space 0..9 and the traditional UK/US shift symbols.
                */
                this.characterMap = {
                    " ": [0, 0, 0, 0, 0, 0],
                    "A": [63, 68, 68, 68, 63, 0],
                    "B": [127, 73, 73, 73, 54, 0],
                    "C": [62, 65, 65, 65, 34, 0],
                    "D": [127, 65, 65, 34, 28, 0],
                    "E": [127, 73, 73, 73, 65, 0],
                    "F": [127, 72, 72, 72, 64, 0],
                    "G": [62, 65, 73, 73, 47, 0],
                    "H": [127, 8, 8, 8, 127, 0],
                    "I": [0, 65, 127, 65, 0, 0],
                    "J": [0, 2, 65, 126, 64, 0],
                    "K": [127, 8, 20, 34, 65, 0],
                    "L": [127, 1, 1, 1, 1, 0],
                    "M": [127, 32, 16, 32, 127, 0],
                    "N": [127, 16, 8, 4, 127, 0],
                    "O": [62, 65, 65, 65, 62, 0],
                    "P": [127, 72, 72, 72, 48, 0],
                    "Q": [62, 65, 69, 66, 61, 0],
                    "R": [127, 72, 76, 74, 49, 0],
                    "S": [49, 73, 73, 73, 102, 0],
                    "T": [64, 64, 127, 64, 64, 0],
                    "U": [126, 1, 1, 1, 126, 0],
                    "V": [124, 2, 1, 2, 124, 0],
                    "W": [126, 1, 6, 1, 126, 0],
                    "X": [99, 20, 8, 20, 99, 0],
                    "Y": [112, 8, 7, 8, 112, 0],
                    "Z": [67, 69, 73, 81, 97, 0],
                    "a": [2, 21, 21, 21, 15, 0],
                    "b": [127, 9, 17, 17, 14, 0],
                    "c": [14, 17, 17, 17, 2, 0],
                    "d": [14, 17, 17, 9, 127, 0],
                    "e": [14, 21, 21, 21, 12, 0],
                    "f": [8, 63, 72, 64, 32, 0],
                    "g": [8, 21, 21, 21, 30, 0],
                    "h": [127, 8, 16, 16, 15, 0],
                    "i": [0, 17, 95, 1, 0, 0],
                    "j": [2, 1, 17, 94, 0, 0],
                    "k": [127, 4, 10, 17, 0, 0],
                    "l": [0, 65, 127, 1, 0, 0],
                    "m": [15, 16, 12, 16, 15, 0],
                    "n": [31, 8, 16, 16, 15, 0],
                    "o": [14, 17, 17, 17, 14, 0],
                    "p": [31, 20, 20, 20, 8, 0],
                    "q": [8, 20, 20, 12, 31, 0],
                    "r": [31, 8, 16, 16, 8, 0],
                    "s": [8, 21, 21, 21, 2, 0],
                    "t": [16, 126, 17, 1, 2, 0],
                    "u": [30, 1, 1, 2, 31, 0],
                    "v": [28, 2, 1, 2, 28, 0],
                    "w": [30, 1, 6, 1, 30, 0],
                    "x": [17, 10, 4, 10, 17, 0],
                    "y": [0, 25, 5, 5, 30, 0],
                    "z": [17, 19, 21, 25, 17, 0],
                    "!": [0, 0, 121, 0, 0, 0],
                    "\\": [0, 112, 0, 112, 0, 0],
                    "#": [20, 127, 20, 127, 20, 0],
                    "$": [18, 42, 127, 42, 36, 0],
                    "%": [98, 100, 8, 19, 35, 0],
                    "&": [54, 73, 85, 34, 5, 0],
                    "'": [0, 80, 96, 0, 0, 0],
                    "(": [0, 28, 34, 65, 0, 0],
                    ")": [0, 65, 34, 28, 0, 0],
                    "*": [20, 8, 62, 8, 20, 0],
                    "+": [8, 8, 62, 8, 8, 0],
                    ",": [0, 5, 6, 0, 0, 0],
                    "-": [8, 8, 8, 8, 8, 0],
                    ".": [0, 3, 3, 0, 0, 0],
                    "/": [2, 4, 8, 16, 32, 0],
                    "0": [62, 69, 73, 81, 62, 0],
                    "1": [0, 33, 127, 1, 0, 0],
                    "2": [33, 67, 69, 73, 49, 0],
                    "3": [66, 65, 81, 105, 70, 0],
                    "4": [8, 24, 40, 127, 8, 0],
                    "5": [114, 81, 81, 81, 78, 0],
                    "6": [30, 41, 73, 73, 6, 0],
                    "7": [64, 71, 72, 80, 96, 0],
                    "8": [54, 73, 73, 73, 54, 0],
                    "9": [48, 73, 73, 74, 60, 0],
                    ":": [0, 54, 54, 0, 0, 0],
                    ";": [0, 53, 54, 0, 0, 0],
                    "<": [8, 20, 34, 65, 0, 0],
                    "=": [20, 20, 20, 20, 20, 0],
                    ">": [65, 34, 20, 8, 0, 0],
                    "?": [32, 64, 69, 72, 48, 0],
                    "@": [38, 73, 79, 65, 62, 0],
                    "[": [0, 127, 65, 65, 0, 0],
                    "]": [0, 65, 65, 127, 0, 0],
                    "£": [9, 63, 73, 33, 0, 0],
                    "^": [16, 32, 64, 32, 16, 0],
                    "_": [1, 1, 1, 1, 1, 0],
                    "`": [64, 32, 16, 0, 0, 0],
                    "{": [0, 8, 54, 65, 0, 0],
                    "|": [0, 0, 119, 0, 0, 0],
                    "}": [0, 65, 54, 8, 0, 0]
                };
            }
            Characters.prototype.getCharacter = function (character) {
                if (this.characterMap.hasOwnProperty(character)) {
                    return this.characterMap[character];
                }
            };
            return Characters;
        })();
        Marquees.Characters = Characters;
    })(DbDashboards.Marquees || (DbDashboards.Marquees = {}));
    var Marquees = DbDashboards.Marquees;
})(DbDashboards || (DbDashboards = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DbDashboards;
(function (DbDashboards) {
    /// <reference path="../Common/Dashboard.ts" />
    /// <reference path="Characters.ts" />
    /// <reference path="../dials/DialBase.ts" />
    /// <reference path="../d/jquery-1.9.1.d.ts" />
    (function (Marquees) {
        var LedMarquee = (function (_super) {
            __extends(LedMarquee, _super);
            function LedMarquee(userOptions, target) {
                _super.call(this);
                this.userOptions = userOptions;
                this.target = target;
                // requested Frames per second
                this.paused = false;
                this.finished = false;
                this.fps = 0;
                this.defaults = {
                    message: "Hey you need to supply a message to show!",
                    ledSize: 2,
                    ledMargin: 1,
                    ledShape: "square",
                    backgroundFillStyle: "#000",
                    ledOffFillStyle: "#500",
                    ledOnFillStyle: "#f00",
                    showFPS: false,
                    fps: 30,
                    speed: 2
                };
                this.lastFrameTime = 0;

                var theme = this.getThemeFromOptions(userOptions, LedMarquee.themes);

                this.options = $.extend({}, this.defaults, theme, userOptions);

                this.content = this.options.message;

                this.onScreenContext = (this.target[0]).getContext("2d");
                this.backBuffer = this.createLayerContext(this.onScreenContext, 0, 0);
                this.fillBackBuffer();
                this.characters = new Marquees.Characters();
                this.currentStringPos = -1;
                this.setNextCharacter();
            }
            LedMarquee.prototype.getThemeFromOptions = function (options, themes) {
                var name = options.theme.trim();
                if (typeof name == "string") {
                    for (var t in themes) {
                        console.log("[" + t + "]" + "|" + name + "|");
                        if (t == name) {
                            return themes[name];
                        }
                    }
                }
                return LedMarquee.themes.chocolate;
            };

            LedMarquee.prototype.render = function () {
                this.start = new Date();
                this.intervalId = window.setInterval((function (marquee) {
                    return function () {
                        if (!marquee.paused && !marquee.finished) {
                            marquee.update();
                            marquee.draw();
                            marquee.updateFps();
                        } else if (marquee.finished) {
                            window.clearInterval(marquee.intervalId);
                        }
                    };
                })(this), 1000 / this.options.fps);
            };

            LedMarquee.prototype.updateFps = function () {
                var now = new Date();
                var span = (now.getTime() - this.start.getTime());

                if (span > 1000) {
                    this.fps = this.frames;
                    this.frames = 0;
                    this.start = now;
                }
                if (this.options.showFPS) {
                    this.onScreenContext.font = "Verdana 6px";
                    this.onScreenContext.strokeStyle = "white";
                    this.onScreenContext.strokeText("" + (this.fps | 0), 2, 8);
                }
            };

            LedMarquee.prototype.destroyInternal = function () {
                this.paused = true;
                this.finished = true;
                window.clearInterval(this.intervalId);
                this.backBuffer = null;
                this.onScreenContext = null;
                this.options = null;
            };

            /**
            * render the current led image to the onscreen canvas
            */
            LedMarquee.prototype.draw = function () {
                // BLIT the back buffer scrolling one led + padding increment
                this.backBuffer.drawImage(this.backBuffer.canvas, -(this.options.ledSize + this.options.ledMargin + 1), 0);

                var x = this.backBuffer.canvas.width - (this.options.ledSize + this.options.ledMargin + 1);

                for (var i = 0; i < 8; i++) {
                    var mask = (1 << i) | 0;
                    var isOn = ((this.nextColumn | 0) & mask) == mask;
                    this.drawLed(x, i, isOn);
                }
                this.drawLed(x, -1, false);

                // render the back buffer to the screen
                this.onScreenContext.drawImage(this.backBuffer.canvas, 0, 0);
            };

            LedMarquee.prototype.fillBackBuffer = function () {
                var start = this.backBuffer.canvas.width - (this.options.ledSize + this.options.ledMargin);
                for (var x = start; x >= 0; x -= (this.options.ledMargin + this.options.ledSize)) {
                    for (var i = 0; i < 8; i++) {
                        this.drawLed(x, i, false);
                    }
                    this.drawLed(x, -1, false);
                }
            };

            LedMarquee.prototype.drawLed = function (canvasX, ledRow, on) {
                var y = (7 - ledRow) * (this.options.ledSize + this.options.ledMargin);

                this.backBuffer.fillStyle = this.options.backgroundFillStyle;
                this.backBuffer.fillRect(canvasX, y, this.options.ledSize + this.options.ledMargin, this.options.ledSize + this.options.ledMargin);

                this.backBuffer.fillStyle = on ? this.options.ledOnFillStyle : this.options.ledOffFillStyle;

                if (this.options.ledShape == "square") {
                    this.backBuffer.fillRect(canvasX, y, this.options.ledSize, this.options.ledSize);
                } else {
                    this.backBuffer.beginPath();
                    this.backBuffer.lineWidth = 0;
                    this.backBuffer.arc(canvasX + this.options.ledSize / 2, y + this.options.ledSize / 2, (this.options.ledSize - 1) / 2, 0, 2 * Math.PI, false);
                    this.backBuffer.closePath();
                    this.backBuffer.fill();
                }
            };

            /**
            * rack the text and prepare for any new character
            */
            LedMarquee.prototype.update = function () {
                this.frames++;
                this.rackStep++;
                this.nextColumn = this.currentCharacter[this.rackStep];
                if (this.rackStep >= this.currentCharacter.length) {
                    this.setNextCharacter();
                }
            };

            LedMarquee.prototype.setNextCharacter = function () {
                this.currentStringPos++;
                this.currentCharacter = this.characters.getCharacter(this.content[this.currentStringPos]);
                if (this.currentCharacter == undefined) {
                    // character not found
                    this.currentCharacter = this.characters.getCharacter("*");
                }
                this.rackStep = -1;
                if (this.content.length - 1 <= this.currentStringPos) {
                    this.currentStringPos = -1;
                }
            };

            LedMarquee.themes = {
                dark: {
                    backgroundFillStyle: "#000",
                    ledOffFillStyle: "#555",
                    ledOnFillStyle: "#ddd"
                },
                blue: {
                    backgroundFillStyle: "#002",
                    ledOffFillStyle: "#009",
                    ledOnFillStyle: "#cbcbf5"
                },
                chocolate: {
                    backgroundFillStyle: "#4A2506",
                    ledOffFillStyle: "#7A3E0C",
                    ledOnFillStyle: "#F7CDAB"
                },
                metro: {
                    backgroundFillStyle: "#2881E3",
                    ledOffFillStyle: "#2881E3",
                    ledOnFillStyle: "#FFFFFF"
                }
            };
            return LedMarquee;
        })(DbDashboards.Common.Dashboard);
        Marquees.LedMarquee = LedMarquee;
    })(DbDashboards.Marquees || (DbDashboards.Marquees = {}));
    var Marquees = DbDashboards.Marquees;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    /// <reference path="../d/jquery-1.9.1.d.ts" />
    /// <reference path="../Common/Dashboard.ts" />
    /// <reference path="DialBezel.ts" />
    /// <reference path="DialFace.ts" />
    /// <reference path="DialGlass.ts" />
    /// <reference path="DialMask.ts" />
    /// <reference path="DialNeedle.ts" />
    /// <reference path="DialScale.ts" />
    /// <reference path="DialValue.ts" />
    /// <reference path="DialOptions.ts" />
    /// <reference path="SliderBezel.ts" />
    /// <reference path="SliderScale.ts" />
    /// <reference path="../marquee/marquee.ts" />
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
    (function (Dials) {
        var DialBase = (function (_super) {
            __extends(DialBase, _super);
            /**
            * Constructs a new DialBase
            * @param options the options for the Dial
            */
            function DialBase(dialSpecificOverrides, userOverrides, target) {
                _super.call(this);
                this.dialSpecificOverrides = dialSpecificOverrides;
                this.userOverrides = userOverrides;
                this.target = target;

                this.options = this.mergeSettings(dialSpecificOverrides, userOverrides);
                this.setOrientation();

                this.context = (this.target[0]).getContext("2d");
                this.backgroundContext = this.createLayerContext(this.context, 0, 0);
                this.needleContext = this.createLayerContext(this.context, 0, 0);
                this.foregroundContext = this.createLayerContext(this.context, 0, 0);
            }
            /**
            * Sets the orientation of the dial, north is the default if not set. We take input from the outside world
            * as either north, south, east, west, or, n, s, e, w
            */
            DialBase.prototype.setOrientation = function () {
                if (typeof this.options.orientation == 'undefined') {
                    this.options.orientation = DialBase.North;
                } else {
                    switch (this.options.orientation.toLocaleLowerCase().charAt(0)) {
                        case "s":
                            this.options.orientation = DialBase.South;
                            break;
                        case "e":
                            this.options.orientation = DialBase.East;
                            break;
                        case "w":
                            this.options.orientation = DialBase.West;
                            break;
                        default:
                            this.options.orientation = DialBase.North;
                            break;
                    }
                }
            };

            /**
            * Public method called to get or set the value of the dial
            * @param value the new value (omit to bet the current value)
            * @returns {number} the new or current value
            */
            DialBase.prototype.value = function (value) {
                if (typeof value != undefined) {
                    this.setValue(value);
                }
                return this.options.value.value;
            };

            DialBase.prototype.destroyInternal = function () {
                this.context = null;
                this.backgroundContext = null;
                this.needleContext = null;
                this.foregroundContext = null;
                this.options = null;
            };

            /**
            * Calls out to render the dial
            */
            DialBase.prototype.render = function () {
                this.context.save();

                //this.applyMask(this.context);
                this.applyMask(this.backgroundContext);
                this.applyMask(this.needleContext);
                this.applyMask(this.foregroundContext);

                this.addFace(this.backgroundContext);
                this.addScale(this.backgroundContext);
                this.drawNeedle(this.needleContext, this.options.value.min);

                if (this.options.glass.visible) {
                    this.addGlass(this.foregroundContext);
                }

                if (this.options.bezel.visible) {
                    this.addBezel(this.foregroundContext);
                }

                this.renderLayers();

                this.context.restore();

                if (this.options.value.value != this.options.value.min) {
                    this.setValue(this.options.value.value);
                }

                this.context.restore();
            };

            DialBase.prototype.setValue = function (v) {
                var vals = this.options.value;

                var original = vals.value;

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
                    this.drawNeedle(this.needleContext, v);
                    this.renderLayers();
                } else {
                    $({ value: original }).animate({ value: vals.value }, {
                        duration: 1000 * sweepDelta,
                        step: (function (d) {
                            return function (now, tween) {
                                d.drawNeedle(d.needleContext, tween.now);
                                d.renderLayers();
                            };
                        })(this)
                    });
                }
            };

            DialBase.prototype.renderLayers = function () {
                this.context.drawImage(this.backgroundContext.canvas, this.options.x, this.options.y);
                this.context.drawImage(this.needleContext.canvas, this.options.x, this.options.y);
                this.context.drawImage(this.foregroundContext.canvas, this.options.x, this.options.y);
            };

            /**
            * Applies a mask to the prevent glass highlights etc over flowing
            */
            DialBase.prototype.applyMask = function (ctx) {
                throw new Error("This method must be implemented");
            };

            /**
            * Renders the face of the dial
            */
            DialBase.prototype.addFace = function (ctx) {
                var df = new Dials.DialFace(this);
                df.addLayer(ctx);
            };

            /**
            * Adds the galss
            */
            DialBase.prototype.addGlass = function (ctx) {
                var g = new Dials.DialGlass(this);
                g.addLayer(ctx);
            };

            DialBase.prototype.addBezel = function (ctx) {
                throw new Error("This method must be implemented");
            };

            DialBase.prototype.addScale = function (ctx) {
                throw new Error("This method must be implemented");
            };

            DialBase.prototype.drawNeedle = function (ctx, stepValue) {
                throw new Error("This method must be implemented");
            };

            /**
            * Forms the totality of the settings for a dial. These are formed of the following:
            *  The base defaults as specified below in the defaults object, overridden by:
            *      The user specified theme (or the default theme if not specified), overridden by:
            *          Any dial specific overrides (such as text placement), overridden by
            *              Any user specified values
            * @param dialSpecificDefaults conains any dial specific over rides or an empty object
            
            * @param userOptions (optional) can contain the user specific overrides
            */
            DialBase.prototype.mergeSettings = function (dialSpecificDefaults, userOptions) {
                var coords = { x: 0, y: 0, width: this.target.width(), height: this.target.height() };
                var theme = this.getThemeFromOptions(userOptions, DialBase.themes);
                var displaySet = this.getDisplaySetFromOptions(userOptions);

                var settings = $.extend(true, coords, DialBase.defaults, {}, theme, displaySet, dialSpecificDefaults, userOptions);
                return settings;
            };

            DialBase.prototype.getThemeFromOptions = function (options, themes) {
                var name = options.theme.trim();
                if (typeof name == "string") {
                    for (var t in themes) {
                        console.log("[" + t + "]" + "|" + name + "|");
                        if (t == name) {
                            return themes[name];
                        }
                    }
                }
                return DialBase.themes.chocolate;
            };

            DialBase.prototype.getDisplaySetFromOptions = function (options) {
                if (typeof options.displaySet != 'undefined') {
                    var name = options.displaySet.trim();
                    for (var t in DialBase.settings) {
                        if (t == name) {
                            return DialBase.settings[name];
                        }
                    }
                }
                return {};
            };
            DialBase.Dial360 = "dial360";
            DialBase.Dial180N = "dial180N";
            DialBase.Dial180S = "dial180S";
            DialBase.Dial180E = "dial180E";
            DialBase.Dial180W = "dial180W";
            DialBase.Slider = "slider";

            DialBase.North = "north";
            DialBase.South = "south";
            DialBase.East = "east";
            DialBase.West = "west";

            DialBase.defaults = {
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
                    width: 5,
                    margin: 10,
                    shadowColor: "cyan",
                    shadowBlur: 1.5,
                    shadowX: -1.5,
                    shadowY: 1.5
                },
                glass: {
                    shape: Dials.DialGlass.ShapeOut,
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
                    },
                    font: {
                        strokeStyle: "pink",
                        fillStyle: "red",
                        family: "Verdana",
                        pixelSize: 12
                    }
                }
            };

            DialBase.themes = {
                dark: {
                    face: {
                        gradientColor2: "black",
                        gradientColor1: "#555"
                    },
                    value: {
                        font: {
                            strokeStyle: "#FFF",
                            fillStyle: "#FFF"
                        }
                    },
                    bezel: {
                        strokeStyle: "#aaa"
                    },
                    needle: {
                        fillStyle: "#ddd",
                        strokeStyle: "#000",
                        shadowColor: "#333"
                    },
                    scale: {
                        strokeStyle: "#eee",
                        majorTicks: {
                            strokeStyle: "#999"
                        },
                        minorTicks: {
                            strokeStyle: "white"
                        },
                        font: {
                            strokeStyle: "white",
                            fillStyle: "#ddd"
                        }
                    }
                },
                blue: {
                    face: {
                        gradientColor2: "#007",
                        gradientColor1: "#00f"
                    },
                    value: {
                        font: {
                            strokeStyle: "#85C2FF",
                            fillStyle: "#85C2FF"
                        }
                    },
                    bezel: {
                        strokeStyle: "#99e"
                    },
                    needle: {
                        fillStyle: "#CBCBF7",
                        strokeStyle: "#000",
                        strokeWidth: 1,
                        shadowColor: "#333"
                    },
                    scale: {
                        strokeStyle: "#ddf",
                        majorTicks: {
                            strokeStyle: "#99e"
                        },
                        minorTicks: {
                            strokeStyle: "#99e"
                        },
                        font: {
                            strokeStyle: "#B8CEFC",
                            fillStyle: "#B8CEFC"
                        }
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
                        strokeStyle: "#000",
                        shadowColor: "#333"
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
                        strokeStyle: "#2881E3",
                        shadowColor: "#333"
                    },
                    scale: {
                        sideMargin: 15,
                        strokeStyle: "#FFFFFF",
                        majorTicks: {
                            strokeStyle: "#FFFFFF"
                        },
                        minorTicks: {
                            strokeStyle: "#FFFFFF"
                        },
                        font: {
                            strokeStyle: "#FFFFFF",
                            fillStyle: "#FFFFFF",
                            family: "Helvetica"
                        }
                    }
                }
            };

            DialBase.settings = {
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
            return DialBase;
        })(DbDashboards.Common.Dashboard);
        Dials.DialBase = DialBase;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    /// <reference path="../d/jquery-1.9.1.d.ts" />
    /// <reference path="DialOptions.ts" />
    /// <reference path="DialBase.ts" />
    (function (Dials) {
        var Dial180 = (function (_super) {
            __extends(Dial180, _super);
            function Dial180(type, dialSpecificOverrides, userOverrides, target) {
                _super.call(this, dialSpecificOverrides, userOverrides, target);
                this.type = type;
                this.dialSpecificOverrides = dialSpecificOverrides;
                this.userOverrides = userOverrides;
                this.target = target;
                this.options.type = type;
            }
            Dial180.prototype.addScale = function (ctx) {
                var s = new Dials.DialScale(this);
                s.addLayer(ctx);
            };

            Dial180.prototype.addBezel = function (ctx) {
                var b = new Dials.DialBezel(this);
                b.addLayer(ctx);
            };

            Dial180.prototype.drawNeedle = function (ctx, stepValue) {
                var s = new Dials.DialNeedle(this);

                this.needleContext.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                s.addLayer(ctx, stepValue);

                var v = new Dials.DialValue(this);
                v.addLayer(ctx, stepValue);
            };

            /**
            * Applies a mask to the prevent glass highlights etc over flowing
            */
            Dial180.prototype.applyMask = function (ctx) {
                var m = new Dials.DialMask(this);
                m.addLayer(ctx);
            };
            Dial180.overrideDefaults = {
                value: {
                    margin: 5
                }
            };
            return Dial180;
        })(Dials.DialBase);
        Dials.Dial180 = Dial180;

        /**
        * A semicircular 180 degree dial with a sweep of  180 degrees
        */
        var Dial180N = (function (_super) {
            __extends(Dial180N, _super);
            /**
            * Constructs a new Dial360
            * @param options the options for the Dial360
            */
            function Dial180N(options, target) {
                _super.call(this, Dials.DialBase.Dial180N, Dial180.overrideDefaults, options, target);
                this.target = target;

                var w = this.target.width();
                if (this.options.width != undefined) {
                    w = this.options.width;
                }

                var h = this.target.height();
                if (this.options.height != undefined) {
                    h = this.options.height;
                }

                var minAxisSize = (Math.max(w, h)) - 1;

                this.options.prv = {
                    effectiveHeight: minAxisSize,
                    effectiveWidth: minAxisSize,
                    scaleStartAngle: Math.PI,
                    scaleEndAngle: 0,
                    needleZeroOffset: -Math.PI / 2,
                    needleSweep: 180 * Dials.DialScale.piOver180,
                    needleX: minAxisSize / 2,
                    needleY: minAxisSize / 2,
                    needleLength: minAxisSize / 2
                };
            }
            return Dial180N;
        })(Dial180);
        Dials.Dial180N = Dial180N;

        /**
        * A semicircular 180 degree dial with a sweep of  180 degrees
        */
        var Dial180S = (function (_super) {
            __extends(Dial180S, _super);
            function Dial180S(options, target) {
                _super.call(this, Dials.DialBase.Dial180S, Dial180.overrideDefaults, options, target);
                this.target = target;

                var w = this.target.width();
                if (this.options.width != undefined) {
                    w = this.options.width;
                }

                var h = this.target.height();
                if (this.options.height != undefined) {
                    h = this.options.height;
                }

                var minAxisSize = (Math.max(w, h)) - 1;

                this.options.prv = {
                    effectiveHeight: minAxisSize - 1,
                    effectiveWidth: minAxisSize - 1,
                    scaleStartAngle: 0,
                    scaleEndAngle: Math.PI,
                    needleZeroOffset: Math.PI / 2,
                    needleSweep: 180 * Dials.DialScale.piOver180,
                    needleX: minAxisSize / 2,
                    needleY: this.options.baseRunOutSize,
                    needleLength: minAxisSize / 2
                };
            }
            return Dial180S;
        })(Dial180);
        Dials.Dial180S = Dial180S;

        /**
        * A semicircular 180 degree dial with a sweep of  180 degrees
        */
        var Dial180E = (function (_super) {
            __extends(Dial180E, _super);
            function Dial180E(options, target) {
                _super.call(this, Dials.DialBase.Dial180E, Dial180.overrideDefaults, options, target);
                this.target = target;

                var w = this.target.width();
                if (this.options.width != undefined) {
                    w = this.options.width;
                }

                var h = this.target.height();
                if (this.options.height != undefined) {
                    h = this.options.height;
                }

                var minAxisSize = (Math.max(w, h)) - 1;

                this.options.prv = {
                    effectiveHeight: minAxisSize - 1,
                    effectiveWidth: minAxisSize - 1,
                    scaleStartAngle: 3 * Math.PI / 2,
                    scaleEndAngle: Math.PI / 2,
                    needleZeroOffset: 0,
                    needleSweep: 180 * Dials.DialScale.piOver180,
                    needleX: this.options.baseRunOutSize,
                    needleY: minAxisSize / 2,
                    needleLength: minAxisSize / 2
                };
            }
            return Dial180E;
        })(Dial180);
        Dials.Dial180E = Dial180E;

        /**
        * A semicircular 180 degree dial with a sweep of  180 degrees
        */
        var Dial180W = (function (_super) {
            __extends(Dial180W, _super);
            function Dial180W(options, target) {
                _super.call(this, Dials.DialBase.Dial180W, Dial180.overrideDefaults, options, target);
                this.target = target;

                var w = this.target.width();
                if (this.options.width != undefined) {
                    w = this.options.width;
                }

                var h = this.target.height();
                if (this.options.height != undefined) {
                    h = this.options.height;
                }

                var minAxisSize = (Math.max(w, h)) - 1;

                this.options.prv = {
                    effectiveHeight: minAxisSize - 1,
                    effectiveWidth: (minAxisSize / 2 + this.options.baseRunOutSize),
                    scaleStartAngle: Math.PI / 2,
                    scaleEndAngle: 3 * Math.PI / 2,
                    needleZeroOffset: Math.PI,
                    needleSweep: 180 * Dials.DialScale.piOver180,
                    needleX: minAxisSize / 2,
                    needleY: minAxisSize / 2,
                    needleLength: minAxisSize / 2
                };
            }
            return Dial180W;
        })(Dial180);
        Dials.Dial180W = Dial180W;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    /// <reference path="../d/jquery-1.9.1.d.ts" />
    /// <reference path="DialOptions.ts" />
    /// <reference path="DialBase.ts" />
    (function (Dials) {
        /**
        * A circular 240 degree dial with a sweep of approximately 240 degrees
        */
        var Dial360 = (function (_super) {
            __extends(Dial360, _super);
            /**
            * Constructs a new Dial360
            * @param options the options for the Dial360
            */
            function Dial360(options, target) {
                _super.call(this, Dial360.overrideDefaults, options, target);
                this.target = target;

                var w = this.target.width();
                if (this.options.width != undefined) {
                    w = Math.min(this.options.width, w);
                }

                var h = this.target.height();
                if (this.options.height != undefined) {
                    w = Math.min(this.options.height, h);
                }

                var minAxisSize = (Math.min(w, h)) - 1;

                this.options.prv = {
                    effectiveHeight: minAxisSize,
                    effectiveWidth: minAxisSize,
                    scaleStartAngle: (3 * Math.PI) / 4,
                    scaleEndAngle: (Math.PI) / 4,
                    needleZeroOffset: -(3 * Math.PI) / 4,
                    needleSweep: 270 * Dials.DialScale.piOver180,
                    needleX: minAxisSize / 2,
                    needleY: minAxisSize / 2,
                    needleLength: minAxisSize / 2
                };
            }
            /**
            * Applies a mask to the prevent glass highlights etc over flowing
            */
            Dial360.prototype.applyMask = function (ctx) {
                var m = new Dials.DialMask(this);
                m.addLayer(ctx);
            };

            Dial360.prototype.addScale = function (ctx) {
                var s = new Dials.DialScale(this);
                s.addLayer(ctx);
            };

            Dial360.prototype.drawNeedle = function (ctx, stepValue) {
                var s = new Dials.DialNeedle(this);
                this.needleContext.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                s.addLayer(ctx, stepValue);
                var v = new Dials.DialValue(this);
                v.addLayer(ctx, stepValue);
            };

            Dial360.prototype.addBezel = function (ctx) {
                var b = new Dials.DialBezel(this);
                b.addLayer(ctx);
            };

            Dial360.overrideDefaults = {
                type: Dials.DialBase.Dial360,
                value: {
                    margin: 15
                }
            };
            return Dial360;
        })(Dials.DialBase);
        Dials.Dial360 = Dial360;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    /// <reference path="DialOptions.ts" />
    /// <reference path="DialBase.ts" />
    /// <reference path="Dial180.ts" />
    (function (Dials) {
        var SliderMask = (function () {
            function SliderMask(dial) {
                this.dial = dial;
            }
            SliderMask.prototype.addLayer = function (ctx) {
                var w = this.dial.options.prv.effectiveWidth;
                var h = this.dial.options.prv.effectiveHeight;

                ctx.rect(0, 0, w, h);
                ctx.clip();
            };
            return SliderMask;
        })();
        Dials.SliderMask = SliderMask;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    /// <reference path="DialOptions.ts" />
    /// <reference path="DialBase.ts" />
    (function (Dials) {
        var SliderNeedle = (function () {
            function SliderNeedle(dial) {
                this.dial = dial;
            }
            SliderNeedle.prototype.addLayer = function (ctx, stepValue) {
                var cx = this.dial.options.prv.needleX;
                var cy = this.dial.options.prv.needleY;
                var hw = this.dial.options.needle.width;
                var nt = this.dial.options.bezel.margin + this.dial.options.bezel.width / 2 + this.dial.options.needle.margin;
                var needleLength = this.dial.options.prv.needleLength;

                ctx.beginPath();

                ctx.strokeStyle = this.dial.options.needle.strokeStyle;
                ctx.lineWidth = this.dial.options.needle.strokeWidth;
                ctx.fillStyle = this.dial.options.needle.fillStyle;

                switch (this.dial.options.orientation) {
                    case Dials.DialBase.North:
                        ctx.rect(cx - hw, cy, hw, needleLength);
                        break;
                    case Dials.DialBase.South:
                        ctx.rect(cx - hw, cy - needleLength, hw, needleLength);
                        break;
                    case Dials.DialBase.West:
                        ctx.rect(cx, cy - hw, needleLength, hw);
                        break;
                    case Dials.DialBase.East:
                        ctx.rect(cx - needleLength, cy - hw, needleLength, hw);
                        break;
                }
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            };
            return SliderNeedle;
        })();
        Dials.SliderNeedle = SliderNeedle;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    /// <reference path="../d/jquery-1.9.1.d.ts" />
    /// <reference path="DialOptions.ts" />
    /// <reference path="DialBase.ts" />
    /// <reference path="SliderMask.ts" />
    /// <reference path="SliderNeedle.ts" />
    (function (Dials) {
        /**
        * A horizontal gauge
        */
        var Slider = (function (_super) {
            __extends(Slider, _super);
            /**
            * Constructs a new Dial360
            * @param options the options for the Dial360
            */
            function Slider(options, target) {
                _super.call(this, Slider.overrideDefaults, options, target);
                this.target = target;

                var w = this.options.width || this.target.width();
                var h = this.options.height || this.target.height();

                this.options.prv = {
                    effectiveHeight: h,
                    effectiveWidth: w,
                    scaleStartAngle: 0,
                    scaleEndAngle: 0,
                    needleZeroOffset: -Math.PI,
                    needleSweep: 270 * Dials.DialScale.piOver180,
                    needleX: w / 2,
                    needleY: this.options.scale.margin + this.options.bezel.margin + this.options.bezel.width,
                    needleLength: 10
                };

                if (this.options.orientation == Dials.DialBase.North || this.options.orientation == Dials.DialBase.South) {
                    this.scaleInnerEdge = this.options.scale.sideMargin;
                    this.scaleOuterEdge = this.options.prv.effectiveWidth - this.options.scale.sideMargin;
                } else {
                    this.scaleInnerEdge = this.options.scale.sideMargin;
                    this.scaleOuterEdge = this.options.prv.effectiveHeight - this.options.scale.sideMargin;
                }
            }
            /**
            * Applies a mask to the prevent glass highlights etc over flowing
            */
            Slider.prototype.applyMask = function (ctx) {
                var m = new Dials.SliderMask(this);
                m.addLayer(ctx);
            };

            Slider.prototype.addScale = function (ctx) {
                var s = new Dials.SliderScale(this);
                s.addLayer(ctx);
            };

            Slider.prototype.drawNeedle = function (ctx, stepValue) {
                var normalized = (stepValue - this.options.value.min) / (this.options.value.max - this.options.value.min);

                var scaleY = this.options.bezel.margin + this.options.bezel.width + this.options.scale.margin + (this.options.scale.width);

                switch (this.options.orientation) {
                    case Dials.DialBase.North:
                        this.options.prv.needleY = this.options.bezel.margin + this.options.bezel.width + (this.options.scale.width);
                        this.options.prv.needleX = this.scaleInnerEdge + ((this.scaleOuterEdge - this.scaleInnerEdge) * normalized);
                        break;
                    case Dials.DialBase.South:
                        this.options.prv.needleY = this.options.height - (this.options.bezel.margin + this.options.bezel.width + (this.options.scale.width));
                        this.options.prv.needleX = this.scaleInnerEdge + ((this.scaleOuterEdge - this.scaleInnerEdge) * normalized);
                        break;
                    case Dials.DialBase.East:
                        this.options.prv.needleX = this.options.width - (this.options.bezel.margin + this.options.bezel.width + (this.options.scale.width));
                        this.options.prv.needleY = this.scaleInnerEdge + ((this.scaleOuterEdge - this.scaleInnerEdge) * normalized);
                        break;
                    case Dials.DialBase.West:
                        this.options.prv.needleX = this.options.bezel.margin + this.options.bezel.width + (this.options.scale.width);
                        this.options.prv.needleY = this.scaleInnerEdge + ((this.scaleOuterEdge - this.scaleInnerEdge) * normalized);
                        break;
                }

                //this.options.prv.needleX = this.scaleInnerEdge + ((this.scaleOuterEdge - this.scaleInnerEdge)*normalized);
                var s = new Dials.SliderNeedle(this);
                this.needleContext.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                s.addLayer(ctx, 0);

                var v = new Dials.DialValue(this);
                v.addLayer(ctx, stepValue);
            };

            Slider.prototype.addBezel = function (ctx) {
                var b = new Dials.SliderBezel(this);
                b.addLayer(ctx);
            };
            Slider.overrideDefaults = {
                type: Dials.DialBase.Slider,
                value: {}
            };
            return Slider;
        })(Dials.DialBase);
        Dials.Slider = Slider;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
/// <reference path="d/jquery-1.9.1.d.ts" />
/// <reference path="dials/DialOptions.ts" />
/// <reference path="dials/dialBase.ts" />
/// <reference path="dials/Dial180.ts" />
/// <reference path="dials/Dial360.ts" />
/// <reference path="dials/Slider.ts" />
/// <reference path="marquee/marquee.ts" />
/// <reference path="dials/DialScale.ts" />
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
/*
Lightweight JQuery integration
*/
(function ($) {
    $.extend($.fn, {
        cDash: function (options) {
            var options = $.extend({ type: "dial360", orientation: "", theme: "chocolate", id: "dbDashboard" }, options);

            return this.each(function () {
                var dial = null;
                var t = options.type.toLowerCase();
                var o = options.orientation.toLowerCase();

                if (t == "dial360") {
                    dial = new DbDashboards.Dials.Dial360(options, $(this));
                } else if (t == "dial180") {
                    switch (options.orientation.toLowerCase()) {
                        case "s":
                        case "south":
                            dial = new DbDashboards.Dials.Dial180S(options, $(this));
                            break;
                        case "e":
                        case "east":
                            dial = new DbDashboards.Dials.Dial180E(options, $(this));
                            break;
                        case "w":
                        case "west":
                            dial = new DbDashboards.Dials.Dial180W(options, $(this));
                            break;
                        default:
                            dial = new DbDashboards.Dials.Dial180N(options, $(this));
                            break;
                    }
                } else if (t == "slider") {
                    dial = new DbDashboards.Dials.Slider(options, $(this));
                } else if (t == "marquee") {
                    dial = new DbDashboards.Marquees.LedMarquee(options, $(this));
                }
                dial.render();

                $(this).data(options.id, dial);
            });
        }
    });
})(jQuery);
