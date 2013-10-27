

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
                var factory: DbDashboards.Dials.ControlFactoryBase = null;

                switch (options.type.toLowerCase()) {
                    case DbDashboards.Dials.ControlFactoryBase.dial180:
                        factory = new DbDashboards.Dials.Dial180Factory(options, $(this));                   
                        break;   
                    case DbDashboards.Dials.ControlFactoryBase.dial360:
                        factory = new DbDashboards.Dials.Dial360Factory(options, $(this));
                        break;   
                    case DbDashboards.Dials.ControlFactoryBase.slider:
                        factory = new DbDashboards.Dials.SliderFactory(options, $(this));
                        break;   
                    case DbDashboards.Dials.ControlFactoryBase.marquee:
                        factory = new DbDashboards.Marquees.MarqueeFactory(options, $(this));
                        break;
                }

                var dial = factory.create();
                dial.render();
                $(this).data(options.id, dial);
            });
        }
    });
})(jQuery);


