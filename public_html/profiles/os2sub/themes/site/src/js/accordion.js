// |--------------------------------------------------------------------------
// | Accordion
// |--------------------------------------------------------------------------
// |
// | This jQuery script is written by
// | Morten Nissen
// |
var os2Accordion = (function ($) {
    'use strict';
    var pub = {};

    /**
     * Instantiate
     */
    pub.init = function (options) {
        registerEventHandlers();
        registerBootEventHandlers();
    };

    /**
     * Register event handlers
     */
    function registerEventHandlers() {

        $('.os2-accordion .os2-accordion-heading').on('click', function(event) {
            var $toggleButton = $(this);

            $toggleButton.parent('.os2-accordion').toggleClass('active');
        });
    }

    /**
     * Register boot event handlers
     */
    function registerBootEventHandlers() {
    }

    return pub;
})(jQuery);
