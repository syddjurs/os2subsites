jQuery(function($) {
    'use strict';

    // Flexy navigation
    flexy_navigation.init();

    // Show dropdowns on mouseover
    let $headers = $('.flexy-header'),
        $dropdowns = $('.flexy-navigation__item--dropdown');

    $dropdowns
        .on('mouseenter', function(event) {
            let $element = $(this),
                $header = $element.parents('.flexy-header'),
                $list_items = $header.find('.flexy-navigation__item--dropdown');

            $list_items.addClass('hover');
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
            $last_list_item = $header.find('.flexy-navigation > .flexy-navigation__item--dropdown:last-child'),
            $dropdown_menu = $last_list_item.find('.flexy-navigation__item__dropdown-menu');

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

    // Apply the same height to all dropdown menus
    $headers.each(function(index, value) {
        let $header = $(this),
            $dropdown_menus = $header.find('.flexy-navigation__item__dropdown-menu'),
            tallest_dropdown = 0;

        // Find the tallest dropdown menu
        $dropdown_menus.each(function(index, value) {
            let $dropdown_menu = $(this),
                height = $dropdown_menu.outerHeight(true);

            if (height > tallest_dropdown) {
                tallest_dropdown = height;
            }
        });

        // Apply the tallest height to all dropdown menus
        $dropdown_menus.css('min-height', tallest_dropdown);
    });
});
