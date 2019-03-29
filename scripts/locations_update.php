<?php

/**
 * @file
 * Cleanup location without content.
 */
ctools_include('plugins');
$fetcher_plugin = FeedsPlugin::instance(
  'OS2webKulturnaultOauth',
  'os2web_kulturnaut_location_importer',
  ctools_get_plugins('feeds', 'plugins', 'OS2webKulturnaultOauth')
);


module_load_include('inc', 'feedd', 'includes/FeedsSource');
$data = (array) json_decode($fetcher_plugin->fetch(FeedsSource::instance('os2web_kulturnaut_location_importer', 0))->getRaw());
if (!is_array($data)) {
  print_r('Wrong json data');
  exit;
}

$to_update = array();
foreach ($data as $location_id => $location_data) {
  $query = new EntityFieldQuery();
  $tids = $query->entityCondition('entity_type', 'taxonomy_term')
    ->entityCondition('bundle', 'os2web_taxonomies_tax_places')
    ->entityCondition('parent', '0', '<>')
    ->propertyCondition('name', $location_data->LocationName)
    ->range(0, 1)
    ->execute();
  
  if (empty($tids)) {
    continue;
  }
  
  $matched_term_link_text = array();
  $terms = taxonomy_get_parents_all(reset(array_keys($tids['taxonomy_term'])));
  if (count($terms) < 2) {
    continue;
  }
  $term = reset($terms);
  $parent = end($terms);
  
  if ($parent->tid != 125) {
    continue;
  }

  if (!empty($term->field_os2web_taxonomies_loc_id)) {
    continue;
  }
  
  $to_update[$term->tid] = $location_id;
//  $field_os2web_taxonomies_loc_id_language = field_language('taxonomy_term', $term, 'field_os2web_taxonomies_loc_id');
//  $term->field_os2web_taxonomies_loc_id[$field_os2web_taxonomies_loc_id_language][] = array('value' => $location_id);
//  taxonomy_term_save($term);
}

print_r('To update '.  count($to_update) . ' terms' . "\n");
print_r($to_update);
