jQuery(function($) {
    'use strict';

    // Flexy header
    flexy_header.init();

    // Sidr
    $('.sidr-toggle--right').sidr({
        name: 'sidr-main',
        side: 'right',
        renaming: false,
        body: '.layout__wrapper',
        source: '.sidr-source-provider'
    });

    // Enable BS3 sidebar
    bs3Sidebar.init();

    // Enable / disable Bootstrap tooltips, based upon touch events
    if(Modernizr.touchevents) {
        $('[data-toggle="tooltip"]').tooltip('hide');
    }
    else {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // Share
    $('.share__item__toggle').on('click', function(event) {
        let $element = $(this);

        $element.parents('.share__item').toggleClass('visible');
    });

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
