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

  $variables['menu_footer__primary'] = _bellcom_generate_menu($primary_navigation_name, 'footer', false, 2);

  $variables['theme_path']  = base_path() . drupal_get_path('theme', $current_theme);

  // Tabs.
  $variables['tabs_primary']   = $variables['tabs'];
  $variables['tabs_secondary'] = $variables['tabs'];
  unset($variables['tabs_primary']['#secondary']);
  unset($variables['tabs_secondary']['#primary']);
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

  $output = l($element['#title'], $element['#href'], $element['#localized_options']);

  return '<li>' . $output . $sub_menu . "</li>\n";
}
