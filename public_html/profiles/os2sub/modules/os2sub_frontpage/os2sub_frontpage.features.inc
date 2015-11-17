<?php
/**
 * @file
 * os2sub_frontpage.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function os2sub_frontpage_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function os2sub_frontpage_node_info() {
  $items = array(
    'velkomst' => array(
      'name' => t('Velkomst'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Titel'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
