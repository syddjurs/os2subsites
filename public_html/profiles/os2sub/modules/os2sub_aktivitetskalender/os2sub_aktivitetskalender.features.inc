<?php
/**
 * @file
 * os2sub_aktivitetskalender.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function os2sub_aktivitetskalender_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function os2sub_aktivitetskalender_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function os2sub_aktivitetskalender_node_info() {
  $items = array(
    'event_calendar' => array(
      'name' => t('Aktivitet'),
      'base' => 'node_content',
      'description' => t('En indholdstype der bruges til at lave begivenheder i kalenderen.'),
      'has_title' => '1',
      'title_label' => t('Titel'),
      'help' => t('Opret aktivitet'),
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
