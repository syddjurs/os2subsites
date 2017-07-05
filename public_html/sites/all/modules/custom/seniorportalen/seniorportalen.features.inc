<?php
/**
 * @file
 * seniorportalen.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function seniorportalen_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "page_manager" && $api == "pages_default") {
    return array("version" => "1");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function seniorportalen_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_image_default_styles().
 */
function seniorportalen_image_default_styles() {
  $styles = array();

  // Exported image style: seniorspot.
  $styles['seniorspot'] = array(
    'label' => 'seniorspot',
    'effects' => array(
      3 => array(
        'name' => 'epsacrop_crop_reuse',
        'data' => array(
          'jcrop_reuse' => 'os2web_spotbox_image',
        ),
        'weight' => -10,
      ),
      2 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 300,
          'height' => 150,
        ),
        'weight' => -9,
      ),
    ),
  );

  return $styles;
}

/**
 * Implements hook_node_info().
 */
function seniorportalen_node_info() {
  $items = array(
    'kalenderside' => array(
      'name' => t('Kalenderside'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}

/**
 * Implements hook_default_search_api_page().
 */
function seniorportalen_default_search_api_page() {
  $items = array();
  $items['soegning'] = entity_import('search_api_page', '{
    "index_id" : "default_fuzzysearch_index",
    "path" : "soegning",
    "name" : "Soegning",
    "machine_name" : "soegning",
    "description" : null,
    "options" : {
      "mode" : "terms",
      "fields" : [],
      "per_page" : "20",
      "get_per_page" : 0,
      "result_page_search_form" : 1,
      "view_mode" : "search_api_page_result",
      "language_filter" : []
    },
    "enabled" : "1"
  }');
  return $items;
}
