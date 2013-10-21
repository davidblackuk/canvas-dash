

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
        cDash: function( options) {
            var options = $.extend({type: "dial360", orientation: "", theme:"chocolate", id:"dbDashboard"}, options);

            return this.each(function () {
                var dial = null;
                var t = options.type.toLowerCase();
                var o = options.orientation.toLowerCase();

                if (t == "dial360") {
                    dial = new DbDashboards.Dials.Dial360(options,  $(this));
                } else if (t == "dial180") {
                    switch (options.orientation.toLowerCase()) {
                        case "s":
                        case "south":
                            dial = new DbDashboards.Dials.Dial180S(options,  $(this));
                            break;
                        case "e":
                        case "east":
                            dial = new DbDashboards.Dials.Dial180E(options,  $(this));
                            break;
                        case "w":
                        case "west":
                            dial = new DbDashboards.Dials.Dial180W(options,  $(this));
                            break;
                        default:
                            dial = new DbDashboards.Dials.Dial180N(options,  $(this));
                            break;
                    }
                } else if (t == "slider"){
                    dial = new DbDashboards.Dials.Slider(options, $(this));
                } else if (t == "marquee"){
                    dial = new DbDashboards.Marquees.LedMarquee(options, $(this));
                }
                dial.render();

                $(this).data(options.id, dial);
            });
        }
    });
})(jQuery);


