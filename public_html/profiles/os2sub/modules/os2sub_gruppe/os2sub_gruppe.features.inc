<?php
/**
 * @file
 * os2sub_gruppe.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function os2sub_gruppe_ctools_plugin_api($module = NULL, $api = NULL) {
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
function os2sub_gruppe_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_flag_default_flags().
 */
function os2sub_gruppe_flag_default_flags() {
  $flags = array();
  // Exported flag: "Meld afbud".
  $flags['meld_afbud'] = array(
    'entity_type' => 'node',
    'title' => 'Meld afbud',
    'global' => 0,
    'types' => array(
      0 => 'os2web_group_event',
    ),
    'flag_short' => 'Meld afbud',
    'flag_long' => '',
    'flag_message' => 'Du har nu meldt afbud',
    'unflag_short' => 'Fjern afbud',
    'unflag_long' => 'Du har meldt afbud, klik for at anullere dit afbud',
    'unflag_message' => 'Du har ikke længere meldt afbud',
    'unflag_denied_text' => '',
    'link_type' => 'toggle',
    'weight' => 0,
    'show_in_links' => array(
      'full' => 'full',
      'teaser' => 'teaser',
      'rss' => 0,
      'search_index' => 0,
      'search_result' => 0,
      'spotbox' => 0,
      'token' => 0,
    ),
    'show_as_field' => 0,
    'show_on_form' => 0,
    'access_author' => '',
    'show_contextual_link' => 0,
    'i18n' => 0,
    'module' => 'os2sub_gruppe',
    'locked' => array(
      0 => 'name',
    ),
    'api_version' => 3,
  );
  return $flags;

}

/**
 * Implements hook_node_info().
 */
function os2sub_gruppe_node_info() {
  $items = array(
    'os2sub_group_mail' => array(
      'name' => t('Gruppe E-mail'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'os2web_group' => array(
      'name' => t('Gruppe'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Titel'),
      'help' => '',
    ),
    'os2web_group_event' => array(
      'name' => t('Gruppe Møde'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Titel'),
      'help' => '',
    ),
  );
  return $items;
}
