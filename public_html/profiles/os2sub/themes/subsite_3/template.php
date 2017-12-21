<?php

/**
 * Implements template_preprocess_html().
 */
function subsite_3_preprocess_html(&$variables) {
  $theme_path = path_to_theme();

  // Add stylesheets
  drupal_add_css($theme_path . '/dist/stylesheets/stylesheet.css',
    [
      'group' => CSS_THEME,
    ]);

  // Add javascript files
  drupal_add_js($theme_path . '/dist/javascripts/modernizr.js',
    [
      'type'  => 'file',
      'scope' => 'footer',
      'group' => JS_LIBRARY,
    ]);
  drupal_add_js($theme_path . '/dist/javascripts/app.js',
    [
      'type'  => 'file',
      'scope' => 'footer',
      'group' => JS_THEME,
    ]);

  // Add fonts from Google fonts API.
  drupal_add_css('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600',
    ['type' => 'external']);
}

/**
 * Implements hook_preprocess_page().
 */
function subsite_3_preprocess_page(&$variables) {
  $current_theme                     = variable_get('theme_default', 'none');
  $primary_navigation_name           = variable_get('menu_main_links_source', 'main-menu');
  $secondary_navigation_name         = variable_get('menu_secondary_links_source', 'user-menu');

  // Overriding the one set by mother theme, as we want to limit the number of levels shown
  $variables['flexy_navigation__primary'] = _bellcom_generate_menu($primary_navigation_name, 'flexy_navigation', TRUE, 2);

  $variables['menu_footer__primary'] = _bellcom_generate_menu($primary_navigation_name, 'footer', false, 2);
  $variables['menu_header__row_first__secondary'] = _bellcom_generate_menu($secondary_navigation_name, 'flexy_list', false, 1);

  $variables['theme_path']  = base_path() . drupal_get_path('theme', $current_theme);

  // Tabs.
  $variables['tabs_primary']   = $variables['tabs'];
  $variables['tabs_secondary'] = $variables['tabs'];
  unset($variables['tabs_primary']['#secondary']);
  unset($variables['tabs_secondary']['#primary']);
}

/**
 * Implements template_preprocess_node.
 */
function subsite_3_preprocess_node(&$variables) {
  $node = $variables['node'];

  // Optionally, run node-type-specific preprocess functions, like
  // foo_preprocess_node_page() or foo_preprocess_node_story().
  $function_node_type = __FUNCTION__ . '__' . $node->type;
  $function_view_mode = __FUNCTION__ . '__' . $variables['view_mode'];

  if (function_exists($function_node_type)) {
    $function_node_type($variables);
  }

  if (function_exists($function_view_mode)) {
    $function_view_mode($variables);
  }
}

/**
 * Implements template_preprocess_node().
 */
function subsite_3_preprocess_node__os2web_kulturnaut_knactivity(&$variables) {
  $node = $variables['node'];
  $view_mode = $variables['view_mode'];

  if ($venue_target = field_get_items('node', $node, 'field_os2web_kulturnaut_venue')) {
    if ($venue = taxonomy_term_load($venue_target[0]['tid'])) {
      if ($venue_tree = taxonomy_get_parents_all($venue->tid)) {

        // Reverse, so the top level term is key 0
        $reversed_venue_tree = array_reverse($venue_tree);

        $top_level_venue = $reversed_venue_tree[0];

        // The top level are not the same as the selected venue
        if ($top_level_venue->tid != $venue->tid) {
          $variables['content']['top_level_venue'] = $top_level_venue;
        }
      }
    }
  }
}

/*
 * Implements theme_menu_tree().
 * For the footer menu.
 */
function subsite_3_menu_tree__footer(&$variables) {
  return $variables['tree'];
}

/*
 * Implements theme_menu_link().
 */
function subsite_3_menu_link__footer(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';

  if ($element['#below']) {

    // Prevent dropdown functions from being added to management menu so it
    // does not affect the navbar module.
    if (($element['#original_link']['menu_name'] == 'management') && (module_exists('navbar'))) {
      $sub_menu = drupal_render($element['#below']);
    }

    elseif ((!empty($element['#original_link']['depth']))) {

      // Add our own wrapper.
      unset($element['#below']['#theme_wrappers']);

      // Submenu classes
      $sub_menu = ' <ul>' . drupal_render($element['#below']) . '</ul>';
    }
  }

  // If this is a parent link, slinky require is to just link to a #
  if ($element['#below']) {
    $element['#href'] = '';

    $element['#localized_options']['fragment'] = 'content';
    $element['#localized_options']['external'] = TRUE;
  }

  // Remove disallowed classes
  $disallowed_items = array('flexy-navigation__item--primary', 'flexy-navigation__item--secondary', 'flexy-navigation__item--tertiary', 'flexy-navigation__item--quaternary');

  foreach($disallowed_items as $disallowed_item) {
    if (($key = array_search($disallowed_item, $element['#attributes']['class'])) !== false) {
      unset($element['#attributes']['class'][$key]);
    }
  }

  $output = l($element['#title'], $element['#href'], $element['#localized_options']);

  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}
