// |--------------------------------------------------------------------------
// | OS2 Self Service Toggle
// |--------------------------------------------------------------------------
// |
// | This jQuery script is written by
// | Morten Nissen
// |

var os2SelfServiceToggle = (function ($) {
    'use strict';
    var pub = {};

    /**
     * Instantiate
     */
    pub.init = function (options) {
        registerEventHandlers();
        registerBootHandlers();
    }

    /**
     * Register event handlers
     */
    function registerEventHandlers() {

        // Main
        $('.os2-self-service-toggle-toggler').on('click touchstart', function (event) {
            event.preventDefault();

            var $element = $(this);

            // Toggle active class
            $element
                .parents('.os2-self-service-toggle')
                .toggleClass('active');
        });

        // Body
        $('.os2-self-service-toggle .selvbetjenings-links .underterm-links > a').on('click touchstart', function (event) {
            event.preventDefault();

            var $element = $(this);

            // Toggle active class
            $element
                .parent()
                .toggleClass('active');
        });
    }

    /**
     * Register boot handlers
     */
    function registerBootHandlers() {
    }

    return pub;
})(jQuery);
