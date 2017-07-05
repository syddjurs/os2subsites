<?php
/**
 * @file
 * os2web_meetings.features.filter.inc
 */

/**
 * Implements hook_filter_default_formats().
 */
function os2web_meetings_filter_default_formats() {
  $formats = array();

  // Exported format: OS2Web Html purifier.
  $formats['os2web_html_purifier'] = array(
    'format' => 'os2web_html_purifier',
    'name' => 'OS2Web Html purifier',
    'cache' => 1,
    'status' => 1,
    'weight' => 0,
    'filters' => array(
      'filter_htmlcorrector' => array(
        'weight' => 10,
        'status' => 1,
        'settings' => array(),
      ),
    ),
  );

  return $formats;
}
