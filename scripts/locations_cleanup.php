<?php

/**
 * @file
 * Cleanup location without content.
 */

$query = new EntityFieldQuery();
$tids = $query->entityCondition('entity_type', 'taxonomy_term')
  ->entityCondition('bundle', 'os2web_taxonomies_tax_places')
  ->entityCondition('parent', '0', '<>')
  ->execute();

if (empty($tids['taxonomy_term'])) {
  echo 'Taxonomy terms mot found';
  exit;
}

$skip_fields = array(
);

$to_skip = array();
$to_clean = array();
$sted = 0;
foreach (array_keys($tids['taxonomy_term']) as $tid) {
  $terms = taxonomy_get_parents_all($tid);
  $term = array_shift($terms);
  $parent = end($terms);
  $skip = FALSE;
  if (empty($parent) || $parent->tid != 125) {
    continue;
  }
  $sted++;
  $not_empty = array();

  if (!empty($term->description)) {
    $skip = TRUE;
    $not_empty[] = 'description';
  }
  
  $fields = field_info_instances('taxonomy_term', 'os2web_taxonomies_tax_places');
  foreach ($fields as $field_name => $field) {
    if (in_array($field_name, $skip_fields)) {
      continue;
    }
    $field_values = field_get_items('taxonomy_term', $term, $field_name);
    if (!empty($field_values)) {
      foreach ($field_values as $field_value) {
        if (is_array($field_value)) {
          foreach ($field_value as $value_key => $value) {
            if (!empty($value)) {
              $skip = TRUE;
              $not_empty[] = $field_name;
              break;
            }
          }
        }
        else {
          $skip = TRUE;
          $not_empty[] = $field_name;
          break;
        }
      }
    }
  }
  
  if ($skip) {
    $to_skip[] = $term->tid . ' ' . $term->name . ' Not empty:' . implode(',', $not_empty);
    continue;
  }

  $to_clean[$term->tid] = $term->tid . ' ' . $term->name;
}

echo format_string("Skipped !count items\n", array('!count' => count($to_skip)));
print_r($to_skip);

echo format_string("To clean !count items\n", array('!count' => count($to_clean)));
print_r($to_clean);
