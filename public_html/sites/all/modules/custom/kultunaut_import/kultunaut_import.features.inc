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
 * Implements hook_default_search_api_page().
 */
function kultunaut_import_default_search_api_page() {
  $items = array();
  $items['oplevsyddjurs'] = entity_import('search_api_page', '{
    "index_id" : "default_fuzzysearch_index",
    "path" : "find",
    "name" : "Oplevsyddjurs",
    "machine_name" : "oplevsyddjurs",
    "description" : "",
    "options" : {
      "mode" : "terms",
      "fields" : [],
      "per_page" : "20",
      "result_page_search_form" : 1,
      "get_per_page" : 0,
      "view_mode" : "teaser",
      "language_filter" : { "current" : "current" },
      "empty_behavior" : "results"
    },
    "enabled" : "1"
  }');
  return $items;
}
