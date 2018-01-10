<?php
/**
 * @file
 * kultunaut_import.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function kultunaut_import_ctools_plugin_api($module = NULL, $api = NULL) {
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
function kultunaut_import_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_image_default_styles().
 */
function kultunaut_import_image_default_styles() {
  $styles = array();

  // Exported image style: oplevbanner.
  $styles['oplevbanner'] = array(
    'label' => 'oplevbanner',
    'effects' => array(
      3 => array(
        'name' => 'epsacrop_crop_reuse',
        'data' => array(
          'jcrop_reuse' => 'os2sub_banner',
        ),
        'weight' => 1,
      ),
      5 => array(
        'name' => 'image_crop',
        'data' => array(
          'width' => 1200,
          'height' => 300,
          'anchor' => 'center-center',
        ),
        'weight' => 3,
      ),
    ),
  );

  return $styles;
}

/**
 * Implements hook_default_search_api_page().
 */
function kultunaut_import_default_search_api_page() {
  $items = array();
  $items['oplevsyddjurs'] = entity_import('search_api_page', '{
    "index_id" : "default_fuzzysearch_index",
    "path" : "find",
    "name" : "Oplevsyddjurs",
    "machine_name" : "oplevsyddjurs",
    "description" : null,
    "options" : {
      "mode" : "terms",
      "fields" : [],
      "per_page" : "20",
      "get_per_page" : 0,
      "result_page_search_form" : 1,
      "view_mode" : "search_result",
      "language_filter" : { "current" : "current" }
    },
    "enabled" : "1"
  }');
  return $items;
}
