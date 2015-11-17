<?php

/**
 * @file
 * Svendborg template for News list panel_pane2. Adds some panel around it.
 *
 * @ingroup views_templates
 */
if (!empty($title)) {
   
  print '<h3>' . t($title) . '</h3>';
}
print '<div class="row">';
// Render columns if needed.
if ($columns) {
  print '<div class="view-columns view-columns-' . count($columns) . '">';
  foreach ($columns as $column_id => $rows) {
    print '<div' . ($columns_classes[$column_id] ? ' class="' . $columns_classes[$column_id] .'"' : '') . '>';
    foreach ($rows as $row_id => $row) {
      print '<div' . ($classes_array[$row_id] ? ' class="' . $classes_array[$row_id] .'"' : '') . '>' . $row . '</div>';
    }
    print '</div>';
  }
  print '</div>';
}
// Render normal view.
else {
  foreach ($rows as $id => $row) {
    print '<div' . ($classes_array[$id] ? ' class="' . $classes_array[$id] .'"' : '') . '>' . $row . '</div>';
  }
}
print '</div>';

