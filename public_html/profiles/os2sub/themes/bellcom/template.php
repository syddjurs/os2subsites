<?php
include( dirname(__FILE__) . '/include/helpers.inc');
include( dirname(__FILE__) . '/include/menu.inc');
include( dirname(__FILE__) . '/include/settings.inc');

/**
 * Implements theme_preprocess_html().
 */
function bellcom_preprocess_html(&$variables) {
  $view_modes = array('xs', 'sm', 'md', 'lg');
  $current_theme = variable_get('theme_default','none');

  // Paths
  $variables['path_js']   = base_path() . drupal_get_path('theme', $current_theme) . '/dist/js';
  $variables['path_img']  = base_path() . drupal_get_path('theme', $current_theme) . '/dist/img';
  $variables['path_css']  = base_path() . drupal_get_path('theme', $current_theme) . '/dist/css';
  $variables['path_font'] = base_path() . drupal_get_path('theme', $current_theme) . '/dist/font';

  // Sidebar
  foreach($view_modes as $view_mode) {
    $variables['classes_array'] = array_merge($variables['classes_array'], _bellcom_sidebar_classes($view_mode));
  }
}

/*
 * Implements theme_preprocess_page().
 */
function bellcom_preprocess_page(&$variables) {
  $current_theme = variable_get('theme_default','none');
  $primary_navigation_name = variable_get('menu_main_links_source', 'main-menu');
  $secondary_navigation_name = variable_get('menu_secondary_links_source', 'user-menu');

  // Navigation
  $variables['primary_navigation'] = _bellcom_generate_menu($primary_navigation_name, 'main-navigation');
  $variables['secondary_navigation'] = _bellcom_generate_menu($secondary_navigation_name, 'main-navigation');
  $variables['sidebar_primary_navigation'] = _bellcom_generate_menu($primary_navigation_name, 'sidebar');
  $variables['sidebar_secondary_navigation'] = _bellcom_generate_menu($secondary_navigation_name, 'sidebar');

  // Paths
  $variables['path_js']   = base_path() . drupal_get_path('theme', $current_theme) . '/dist/js';
  $variables['path_img']  = base_path() . drupal_get_path('theme', $current_theme) . '/dist/img';
  $variables['path_css']  = base_path() . drupal_get_path('theme', $current_theme) . '/dist/css';
  $variables['path_font'] = base_path() . drupal_get_path('theme', $current_theme) . '/dist/font';

  // Theme settings
  $variables['theme_settings'] = _bellcom_collect_theme_settings();
}

/**
 * Implements template_preprocess_node().
 */
function bellcom_preprocess_node(&$variables) {

  // Add node--view_mode.tpl.php suggestions.
  $variables['theme_hook_suggestions'][] = 'node__' . $variables['view_mode'];

  // Make "node--NODETYPE--VIEWMODE.tpl.php" templates available for nodes.
  $variables['theme_hook_suggestions'][] = 'node__' . $variables['type'] . '__' . $variables['view_mode'];

  // Add a class for the view mode.
  $variables['classes_array'][] = 'view-mode-' . $variables['view_mode'];

  // Add css class "node--NODETYPE--VIEWMODE" to nodes.
  $variables['classes_array'][] = 'node--' . $variables['type'] . '--' . $variables['view_mode'];

  // Optionally, run node-type-specific preprocess functions, like
  // foo_preprocess_node_page() or foo_preprocess_node_story().
  $function = __FUNCTION__ . '__' . $variables['node']->type;
  if (function_exists($function)) {
    $function($variables);
  }

  // Title (shortened)
  $variables['title_shortened'] = _bellcom_text_shortener($variables['title'], 50);

  // Updated at
  if ($updated_at = $variables['node']->changed) {
    $variables['updated_at_short'] = format_date($updated_at, 'short');
    $variables['updated_at_medium'] = format_date($updated_at, 'medium');
    $variables['updated_at_long'] = format_date($updated_at, 'long');
    $variables['updated_at_ago'] = t('@time ago', array('@time' => format_interval((REQUEST_TIME - $updated_at))));;
    $variables['updated_at_seperated'] = _bellcom_seperated_dates($updated_at);
  }

  // Created at
  if ($created_at = $variables['node']->created) {
    $variables['created_at_short'] = format_date($created_at, 'short');
    $variables['created_at_medium'] = format_date($created_at, 'medium');
    $variables['created_at_long'] = format_date($created_at, 'long');
    $variables['created_at_ago'] = t('@time ago', array('@time' => format_interval((REQUEST_TIME - $created_at))));
    $variables['created_at_seperated'] = _bellcom_seperated_dates($created_at);
  }
}

/*
 * Implements template_preprocess_comment().
 */
function bellcom_preprocess_comment(&$variables) {

  // Updated at
  if ($updated_at = $variables['comment']->changed) {
    $variables['updated_at_short'] = format_date($updated_at, 'short');
    $variables['updated_at_medium'] = format_date($updated_at, 'medium');
    $variables['updated_at_long'] = format_date($updated_at, 'long');
    $variables['updated_at_ago'] = t('@time ago', array('@time' => format_interval((REQUEST_TIME - $updated_at))));
    $variables['updated_at_seperated'] = _bellcom_seperated_dates($updated_at);
  }

  // Created at
  if ($created_at = $variables['comment']->created) {
    $variables['created_at_short'] = format_date($created_at, 'short');
    $variables['created_at_medium'] = format_date($created_at, 'medium');
    $variables['created_at_long'] = format_date($created_at, 'long');
    $variables['created_at_ago'] = t('@time ago', array('@time' => format_interval((REQUEST_TIME - $created_at))));
    $variables['created_at_seperated'] = _bellcom_seperated_dates($created_at);
  }
}

/*
 * Implements template_preprocess_taxonomy_term().
 */
function bellcom_preprocess_taxonomy_term(&$variables) {

  // Add node--view_mode.tpl.php suggestions.
  $variables['theme_hook_suggestions'][] = 'taxonomy-term__' . $variables['view_mode'];

  // Add a class for the view mode.
  $variables['classes_array'][] = 'view-mode-' . $variables['view_mode'];
}

/*
 * Implements template_preprocess_field().
 */
function bellcom_preprocess_field(&$variables, $hook) {
}

/*
 * Implements hook_preprocess_region().
 */
function bellcom_preprocess_region(&$variables, $hook) {
}

/*
 * Implements theme_preprocess_block().
 */
function bellcom_preprocess_block(&$variables) {

  $variables ['classes_array'][] = drupal_html_class('block-' . $variables ['block']->module);
}

/*
 * Implements theme_menu_tree().
 */
function bellcom_menu_tree__main_menu__main_navigation(&$variables) {
  return '<ul class="main-navigation-list">' . $variables['tree'] . '</ul>';
}
function bellcom_menu_tree__user_menu__main_navigation(&$variables) {
  return '<ul class="main-navigation-list main-navigation-right">' . $variables['tree'] . '</ul>';
}
function bellcom_menu_tree__main_menu__sidebar(&$variables) {
  return '<ul class="sidebar-navigation">' . $variables['tree'] . '</ul>';
}
function bellcom_menu_tree__user_menu__sidebar(&$variables) {
  return '<ul class="sidebar-navigation">' . $variables['tree'] . '</ul>';
}

/*
 * Implements theme_menu_link().
 */
function bellcom_menu_link__main_navigation(array $variables) {
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
      $sub_menu = '<ul class="main-navigation-list-dropdown-menu">' . drupal_render($element['#below']) . '</ul>';

      // Generate as dropdown.
      $element['#attributes']['class'][] = 'main-navigation-list-dropdown';
      $element['#localized_options']['html'] = TRUE;
    }
  }
  else {
    $element['#attributes']['class'][] = 'main-navigation-list-link';
  }

  // On primary navigation menu, class 'active' is not set on active menu item.
  // @see https://drupal.org/node/1896674
  if (($element['#href'] == $_GET['q'] || ($element['#href'] == '<front>' && drupal_is_front_page())) && (empty($element['#localized_options']['language']))) {
    $element['#attributes']['class'][] = 'active';
  }

  // If this item is active and/or in the active trail, add necessary classes.
  $active_classes = _bellcom_in_active_trail($element['#href']);
  if (isset($element['#attributes']['class'])) {
    $element['#attributes']['class'] = array_merge($element['#attributes']['class'], $active_classes);
  }
  else {
    $element['#attributes']['class'] = $active_classes;
  }

  $output = l($element['#title'], $element['#href'], $element['#localized_options']);

  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

/*
 * Implements theme_menu_link().
 */
function bellcom_menu_link__sidebar(array $variables) {
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
      $sub_menu_attributes['element']['class'] = array();
      $sub_menu_attributes['element']['class'][] = 'sidebar-navigation-dropdown-menu';
      if (in_array('active', $element['#attributes']['class']) or in_array('active-trail', $element['#attributes']['class'])) {
        $sub_menu_attributes['element']['class'][] = 'active';
      }

      $sub_menu = ' <ul' . drupal_attributes($sub_menu_attributes['element']) . '>' . drupal_render($element['#below']) . '</ul>';

      // Generate as dropdown.
      $element['#title'] .= ' <span class="sidebar-navigation-dropdown-toggle"></span>';
      $element['#attributes']['class'][] = 'sidebar-navigation-dropdown';
      $element['#localized_options']['html'] = TRUE;
    }
  }
  else {
    $element['#attributes']['class'][] = 'sidebar-navigation-link';
  }

  // On primary navigation menu, class 'active' is not set on active menu item.
  // @see https://drupal.org/node/1896674
  if (($element['#href'] == $_GET['q'] || ($element['#href'] == '<front>' && drupal_is_front_page())) && (empty($element['#localized_options']['language']))) {
    $element['#attributes']['class'][] = 'active';
  }

  // Link title class
  $convert_characters = array('/', '_', 'æ', 'ø', 'å');
  $element['#attributes']['class'][] = str_replace('/', '-', $element['#href']);

  $output = l($element['#title'], $element['#href'], $element['#localized_options']);

  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

/*
 * Seperated dates
 * Heavily inspired by drupals format_date() function.
 */
function _bellcom_seperated_dates($timestamp) {
  $seperated_dates = array();

  // Use the advanced drupal_static() pattern, since this is called very often.
  static $drupal_static_fast;
  if (!isset($drupal_static_fast)) {
    $drupal_static_fast['timezones'] = &drupal_static(__FUNCTION__);
  }
  $timezones = &$drupal_static_fast['timezones'];

  if (!isset($timezone)) {
    $timezone = date_default_timezone_get();
  }
  // Store DateTimeZone objects in an array rather than repeatedly
  // constructing identical objects over the life of a request.
  if (!isset($timezones[$timezone])) {
    $timezones[$timezone] = timezone_open($timezone);
  }

  // Use the default langcode if none is set.
  global $language;
  if (empty($langcode)) {
    $langcode = isset($language->language) ? $language->language : 'en';
  }

  // Create a DateTime object from the timestamp.
  $date_time = date_create('@' . $timestamp);
  // Set the time zone for the DateTime object.
  date_timezone_set($date_time, $timezones[$timezone]);

  // Seperated dates
  $seperated_dates = array(
    'day' => array(
      'integer' => date_format($date_time, 'd'),
      'short' => t(date_format($date_time, 'D')),
      'full' => t(date_format($date_time, 'l')),
    ),
    'month' => array(
      'integer' => date_format($date_time, 'm'),
      'short' => t(date_format($date_time, 'M')),
      'full' => t(date_format($date_time, 'F')),
    ),
    'year' => array(
      'short' => date_format($date_time, 'y'),
      'full' => date_format($date_time, 'Y'),
    ),
    'week' => date_format($date_time, 'W'),
  );

  return $seperated_dates;
}

/*
 * Text shortener
 */
function _bellcom_text_shortener($text_string, $max_length) {
  $alter = array(
    'max_length'    => $max_length,
    'ellipsis'      => TRUE,
    'word_boundary' => TRUE,
    'html'          => TRUE,
  );

  $shortened_string = views_trim_text($alter, $text_string);

  return $shortened_string;
}
