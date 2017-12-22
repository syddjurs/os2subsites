jQuery(function($) {
    'use strict';

    // Flexy navigation
    flexy_navigation.init();

    // Show dropdowns on mouseover
    let $headers = $('.flexy-header'),
        $dropdowns_link = $('.flexy-navigation__item--dropdown > a');

    $dropdowns_link
        .on('click', function(event) {
            event.preventDefault();

            let $element = $(this),
                $header = $element.parents('.flexy-header'),
                $list_items = $header.find('.flexy-navigation__item--dropdown');

            if ($list_items.hasClass('hover')) {
                $list_items.removeClass('hover');
            }
            else {
                $list_items.addClass('hover');
            }
        });

    // Remove dropdown on click outside
    $(window).on('click', function(event) {
        let $list_items = $('.flexy-navigation__item--dropdown');

        if ($list_items !== event.target && ! $list_items.has(event.target).length) {
            $list_items.removeClass('hover');
        }
    });

    // Add a "close" toggle to the last dropdown menu in the header
    $headers.each(function(index, value) {
        let $header = $(this),
            $list_item = $header.find('.flexy-navigation > .flexy-navigation__item--dropdown').last(),
            $dropdown_menu = $list_item.find('.flexy-navigation__item__dropdown-menu');

        let $btn = $('<span />')
            .addClass('flexy-navigation__item__dropdown-menu__toggle icon fa fa-close')
            .on('click', function(event) {
                let $element = $(this),
                    $header = $element.parents('.flexy-header'),
                    $list_items = $header.find('.flexy-navigation__item--dropdown');

                $list_items.removeClass('hover');
            });

        $dropdown_menu.append($btn);
    });

    // Set a first- and last child class on the dropdowns
    $headers.each(function(index, value) {
        let $header = $(this);

        // First child
        $header
            .find('.flexy-navigation > .flexy-navigation__item--dropdown')
            .first()
            .addClass('flexy-navigation__item--dropdown--first-child');

        // Last child
        $header
            .find('.flexy-navigation > .flexy-navigation__item--dropdown')
            .last()
            .addClass('flexy-navigation__item--dropdown--last-child');
    });

    // Set dropdown menu height
    function _flexy_navigation_set_dropdown_menu_height() {
        let $headers = $('.flexy-header');

        // Apply the same height to all dropdown menus
        $headers.each(function(index, value) {
            let $header = $(this),
                $dropdown_menus = $header.find('.flexy-navigation__item__dropdown-menu'),
                tallest_dropdown = 0;

            // Remove height temporarily, from the dropdowns so it can be set
            $dropdown_menus.css('height', 'auto');

            // Find the tallest dropdown menu
            $dropdown_menus.each(function(index, value) {
                let $dropdown_menu = $(this),
                    height = $dropdown_menu.outerHeight(true);

                if (height > tallest_dropdown) {
                    tallest_dropdown = height;
                }
            });

            // Apply the tallest height to all dropdown menus
            $dropdown_menus.css('height', tallest_dropdown);
        });
    }
    _flexy_navigation_set_dropdown_menu_height(); // Run on boot

    // Recalculate dropdown menu height when window is resized
    $(window).on('resize', function(){
        _flexy_navigation_set_dropdown_menu_height();
    });
});
