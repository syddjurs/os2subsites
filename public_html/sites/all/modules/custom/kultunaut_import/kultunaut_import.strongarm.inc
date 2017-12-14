<?php
/**
 * @file
 * kultunaut_import.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function kultunaut_import_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'taxonomy_menu_display_descendants_os2web_taxonomies_tax_places';
  $strongarm->value = 0;
  $export['taxonomy_menu_display_descendants_os2web_taxonomies_tax_places'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'taxonomy_menu_display_num_os2web_taxonomies_tax_places';
  $strongarm->value = 0;
  $export['taxonomy_menu_display_num_os2web_taxonomies_tax_places'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'taxonomy_menu_end_all_os2web_taxonomies_tax_places';
  $strongarm->value = FALSE;
  $export['taxonomy_menu_end_all_os2web_taxonomies_tax_places'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'taxonomy_menu_expanded_os2web_taxonomies_tax_places';
  $strongarm->value = 1;
  $export['taxonomy_menu_expanded_os2web_taxonomies_tax_places'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'taxonomy_menu_flat_os2web_taxonomies_tax_places';
  $strongarm->value = 0;
  $export['taxonomy_menu_flat_os2web_taxonomies_tax_places'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'taxonomy_menu_hide_empty_terms_os2web_taxonomies_tax_places';
  $strongarm->value = 0;
  $export['taxonomy_menu_hide_empty_terms_os2web_taxonomies_tax_places'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'taxonomy_menu_path_os2web_taxonomies_tax_places';
  $strongarm->value = 'taxonomy_menu_path_default';
  $export['taxonomy_menu_path_os2web_taxonomies_tax_places'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'taxonomy_menu_rebuild_os2web_taxonomies_tax_places';
  $strongarm->value = 1;
  $export['taxonomy_menu_rebuild_os2web_taxonomies_tax_places'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'taxonomy_menu_sync_os2web_taxonomies_tax_places';
  $strongarm->value = 1;
  $export['taxonomy_menu_sync_os2web_taxonomies_tax_places'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'taxonomy_menu_term_item_description_os2web_taxonomies_tax_places';
  $strongarm->value = 1;
  $export['taxonomy_menu_term_item_description_os2web_taxonomies_tax_places'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'taxonomy_menu_vocab_menu_os2web_taxonomies_tax_places';
  $strongarm->value = 'main-menu';
  $export['taxonomy_menu_vocab_menu_os2web_taxonomies_tax_places'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'taxonomy_menu_vocab_parent_os2web_taxonomies_tax_places';
  $strongarm->value = '0';
  $export['taxonomy_menu_vocab_parent_os2web_taxonomies_tax_places'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'taxonomy_menu_voc_item_description_os2web_taxonomies_tax_places';
  $strongarm->value = 0;
  $export['taxonomy_menu_voc_item_description_os2web_taxonomies_tax_places'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'taxonomy_menu_voc_item_os2web_taxonomies_tax_places';
  $strongarm->value = FALSE;
  $export['taxonomy_menu_voc_item_os2web_taxonomies_tax_places'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'taxonomy_menu_voc_name_os2web_taxonomies_tax_places';
  $strongarm->value = FALSE;
  $export['taxonomy_menu_voc_name_os2web_taxonomies_tax_places'] = $strongarm;

  return $export;
}
