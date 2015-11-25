<?php

/**
 * Implements theme_preprocess_html().
 */
function filmkongen_preprocess_html(&$variables) {
  $theme_path = path_to_theme();

  // Add conditional stylesheets for IE9 and lower.
  drupal_add_css($theme_path . '/dist/css/stylesheet.css', array(
    'group'      => CSS_THEME,
  ));
  drupal_add_css($theme_path . '/dist/css/stylesheet-ie9-1.css', array(
    'group'      => CSS_THEME,
    'browsers'   => array('IE' => 'lte IE 9', '!IE' => FALSE),
  ));
  drupal_add_css($theme_path . '/dist/css/stylesheet-ie9-2.css', array(
    'group'      => CSS_THEME,
    'browsers'   => array('IE' => 'lte IE 9', '!IE' => FALSE),
  ));
  drupal_add_js($theme_path . '/dist/js/modernizr.js', array(
    'group'      => JS_LIBRARY,
  ));
  drupal_add_js($theme_path . '/dist/js/app.js', array(
    'group'      => JS_THEME,
  ));
  drupal_add_js($theme_path . '/dist/js/ie9.js', array(
    'group'      => JS_THEME,
    'browsers'   => array('IE' => 'lte IE 9', '!IE' => FALSE),
  ));

  // Add out fonts from Google Fonts API.
  drupal_add_html_head(array(
    '#tag'        => 'link',
    '#attributes' => array(
      'href' => 'https://fonts.googleapis.com/css?family=Montserrat:400,700|Open+Sans:300,400,700',
      'rel'  => 'stylesheet',
      'type' => 'text/css',
    ),
  ), 'google_font_filmkongen');

  // Body classes
  $variables['classes_array'][] = 'footer-attached';

  $variables['classes_array'][] = 'simple-navigation-enabled-xs';

  $variables['classes_array'][] = 'main-navigation-enabled-md';
  $variables['classes_array'][] = 'main-navigation-enabled-lg';

  // Load jQuery UI
  drupal_add_library('system', 'ui');
}

/**
 * Implements template_preprocess_node.
 */
function filmkongen_preprocess_node(&$variables) {

  // Optionally, run node-type-specific preprocess functions, like
  // foo_preprocess_node_page() or foo_preprocess_node_story().
  $function_node_type = __FUNCTION__ . '__' . $variables['node']->type;
  $function_view_mode = __FUNCTION__ . '__' . $variables['view_mode'];
  if (function_exists($function_node_type)) {
    $function_node_type($variables);
  }
  if (function_exists($function_view_mode)) {
    $function_view_mode($variables);
  }

  // Author
  if ($author_information = bellcom_user_get_raw_information($variables['node']->uid)) {

    if (isset($author_information['full_name'])) {
      $variables['author_full_name'] = $author_information['full_name'];
    }
  }

  // Number of comments
  $variables['number_of_comments'] = t('@comment_count comments', array('@comment_count' => 0));
  if ($number_of_comments = db_query("SELECT COUNT(cid) AS count FROM {comment} WHERE nid = :nid", array(":nid" => $variables['nid']))->fetchField()) {

    // 1
    if ($number_of_comments == 1) {
      $variables['number_of_comments'] = t('@comment_count comment', array('@comment_count' => $number_of_comments));
    }
    else {
      $variables['number_of_comments'] = t('@comment_count comments', array('@comment_count' => $number_of_comments));
    }
  }

  // Number of hits
  $variables['number_of_hits'] = t('Seen by @hits persons', array('@hits' => 0));
  if ($statistics = statistics_get($variables['node']->nid)) {

    // 1
    if ($statistics['totalcount'] == 1) {
      $variables['number_of_hits'] = t('Seen by @hits person', array('@hits' => $statistics['totalcount']));
    }
    else {
      $variables['number_of_hits'] = t('Seen by @hits persons', array('@hits' => $statistics['totalcount']));
    }
  }
}

/*
 * Implements template_preprocess_comment().
 */
function filmkongen_preprocess_comment(&$variables) {

  // Author
  if ($author_information = bellcom_user_get_raw_information($variables['comment']->uid)) {

    if (isset($author_information['full_name'])) {
      $variables['author_full_name'] = $author_information['full_name'];
    }
  }
}

/*
 * Full node
 * Implements hook_preprocess_node().
 */
function filmkongen_preprocess_node__full(&$variables) {
}
