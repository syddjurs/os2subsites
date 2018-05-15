<?php
/**
 * @file
 * os2web_kulturnaut_events.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function os2web_kulturnaut_events_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'diff_enable_revisions_page_node_os2web_kulturnaut_knactivity';
  $strongarm->value = 1;
  $export['diff_enable_revisions_page_node_os2web_kulturnaut_knactivity'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'diff_show_preview_changes_node_os2web_kulturnaut_knactivity';
  $strongarm->value = 1;
  $export['diff_show_preview_changes_node_os2web_kulturnaut_knactivity'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'diff_view_mode_preview_node_os2web_kulturnaut_knactivity';
  $strongarm->value = 'full';
  $export['diff_view_mode_preview_node_os2web_kulturnaut_knactivity'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'feeds_process_limit';
  $strongarm->value = 20;
  $export['feeds_process_limit'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'field_bundle_settings_node__os2web_kulturnaut_knactivity';
  $strongarm->value = array(
    'view_modes' => array(
      'teaser' => array(
        'custom_settings' => TRUE,
      ),
      'spotbox' => array(
        'custom_settings' => TRUE,
      ),
      'full' => array(
        'custom_settings' => FALSE,
      ),
      'rss' => array(
        'custom_settings' => FALSE,
      ),
      'search_index' => array(
        'custom_settings' => FALSE,
      ),
      'search_result' => array(
        'custom_settings' => TRUE,
      ),
      'token' => array(
        'custom_settings' => FALSE,
      ),
      'os2sub_spotbox_single' => array(
        'custom_settings' => TRUE,
      ),
      'revision' => array(
        'custom_settings' => FALSE,
      ),
      'os2sub_spotbox_mini' => array(
        'custom_settings' => TRUE,
      ),
      'os2sub_teaser_mini' => array(
        'custom_settings' => TRUE,
      ),
      'os2sub_spotbox_list' => array(
        'custom_settings' => TRUE,
      ),
      'diff_standard' => array(
        'custom_settings' => FALSE,
      ),
      'list' => array(
        'custom_settings' => TRUE,
      ),
      'list_advanced' => array(
        'custom_settings' => TRUE,
      ),
      'list_simple' => array(
        'custom_settings' => TRUE,
      ),
    ),
    'extra_fields' => array(
      'form' => array(
        'metatags' => array(
          'weight' => '3',
        ),
        'title' => array(
          'weight' => '0',
        ),
        'path' => array(
          'weight' => '2',
        ),
      ),
      'display' => array(),
    ),
  );
  $export['field_bundle_settings_node__os2web_kulturnaut_knactivity'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'language_content_type_os2web_kulturnaut_knactivity';
  $strongarm->value = '0';
  $export['language_content_type_os2web_kulturnaut_knactivity'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_os2web_kulturnaut_knactivity';
  $strongarm->value = array();
  $export['menu_options_os2web_kulturnaut_knactivity'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_os2web_kulturnaut_knactivity';
  $strongarm->value = 'os2web-main-menu:0';
  $export['menu_parent_os2web_kulturnaut_knactivity'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_os2web_kulturnaut_knactivity';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_os2web_kulturnaut_knactivity'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_os2web_kulturnaut_knactivity';
  $strongarm->value = '0';
  $export['node_preview_os2web_kulturnaut_knactivity'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_os2web_kulturnaut_knactivity';
  $strongarm->value = 0;
  $export['node_submitted_os2web_kulturnaut_knactivity'] = $strongarm;

  return $export;
}
