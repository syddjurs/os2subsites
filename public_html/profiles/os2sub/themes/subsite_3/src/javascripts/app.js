jQuery(function($) {
    'use strict';

    // Flexy header
    flexy_header.init();

    // Sidr
    $('.slinky-menu')
        .find('ul, li, a')
        .removeClass();

    $('.sidr-toggle--right').sidr({
        name: 'sidr-main',
        side: 'right',
        renaming: false,
        body: '.layout__wrapper',
        source: '.sidr-source-provider'
    });

    // Slinky
    $('.sidr .slinky-menu').slinky({
        title: true,
        label: ''
    });

    // Enable / disable Bootstrap tooltips, based upon touch events
    if(Modernizr.touchevents) {
        $('[data-toggle=tooltip]').tooltip('hide');
    }
    else {
        $('[data-toggle=tooltip]').tooltip();
    }

    // Better exposed filter
    let $checkboxes = $('.form-type-bef-checkbox input[type="checkbox"]');

    $checkboxes.each(function(index, item) {
        let $element = $(this),
            $parent = $element.parents('.form-type-bef-checkbox');

        // Add classes on document load
        if ($element.is(':checked')) {
            $parent.addClass('is-checked');
        } else {
            $parent.removeClass('is-checked');
        }

        // When checkbox value is changed
        $element.on('change', function(event) {
            let $element = $(this),
                $parent = $element.parents('.form-type-bef-checkbox');

            if ($element.is(':checked')) {
                $parent.addClass('is-checked');
            } else {
                $parent.removeClass('is-checked');
            }
        });
    });
});
