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
  drupal_add_css('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700',
    ['type' => 'external']);
}

/**
 * Implements hook_preprocess_page().
 */
function subsite_3_preprocess_page(&$variables) {
  $current_theme                     = variable_get('theme_default', 'none');
  $primary_navigation_name           = variable_get('menu_main_links_source', 'main-menu');
  $secondary_navigation_name         = variable_get('menu_secondary_links_source', 'user-menu');
  $variables['menu_slinky__primary'] = _bellcom_generate_menu($primary_navigation_name,'slinky', TRUE);

  $variables['theme_path']  = base_path() . drupal_get_path('theme', $current_theme);

  // Tabs.
  $variables['tabs_primary']   = $variables['tabs'];
  $variables['tabs_secondary'] = $variables['tabs'];
  unset($variables['tabs_primary']['#secondary']);
  unset($variables['tabs_secondary']['#primary']);
}
