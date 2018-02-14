<?php
/**
 * @file
 * os2web_kulturnaut_events.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function os2web_kulturnaut_events_taxonomy_default_vocabularies() {
  return array(
    'event_target' => array(
      'name' => 'Event target',
      'machine_name' => 'event_target',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
    'feeds' => array(
      'name' => 'Feeds',
      'machine_name' => 'feeds',
      'description' => 'Feeds export source',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
    'os2web_kulturnaut_tema' => array(
      'name' => 'Kategori',
      'machine_name' => 'os2web_kulturnaut_tema',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
    'os2web_kulturnaut_venue' => array(
      'name' => 'Steder',
      'machine_name' => 'os2web_kulturnaut_venue',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
  );
}
