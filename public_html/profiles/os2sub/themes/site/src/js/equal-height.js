// |--------------------------------------------------------------------------
// | Equal height
// |--------------------------------------------------------------------------
// |
// | This jQuery script is written by
// | Morten Nissen
// |
var equalHeight = (function ($) {
    'use strict';
    var pub = {};

    /**
     * Instantiate
     */
    pub.init = function (options) {

        $(window).on('load', function () {
            registerEventHandlers();
            registerBootEventHandlers();
        });
    };

    /**
     * Register event handlers
     */
    function registerEventHandlers() {

        $(window).resize(function () {
            setEqualHeights();
        });
    }

    /**
     * Register boot event handlers
     */
    function registerBootEventHandlers() {
        setEqualHeights();
    }

    function setEqualHeights() {

        $('.os2-equal-height-wrapper').each(function() {
            var $wrapper = $(this);
            var $elements = $wrapper.find('.os2-equal-height-element');
            var tallestElementHeight = 0;

            $elements.each(function() {
                var $element = $(this);
                var elementHeight = $element.outerHeight();

                if (elementHeight > tallestElementHeight) {
                    tallestElementHeight = elementHeight;
                }
            });

            $elements.css('min-height', tallestElementHeight);
        });
    }

    return pub;
})(jQuery);
