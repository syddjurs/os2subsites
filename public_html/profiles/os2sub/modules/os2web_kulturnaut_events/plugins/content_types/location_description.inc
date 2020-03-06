<?php

/**
 * @file
 * Plugins are described by creating a $plugin array which will be used
 * by the system that includes this file.
 */

$plugin = array(
  'single' => TRUE,
  'title' => t('Location description'),
  'icon' => 'icon_term.png',
  'description' => t('Location description.'),
  'required context' => new ctools_context_required(t('Term'), array('term', 'taxonomy_term')),
  'category' => t('Kulturnaut'),
);

function os2web_kulturnaut_events_location_description_content_type_render($subtype, $conf, $panel_args, $context) {
  $term = isset($context->data) ? clone $context->data : NULL;
  $block = new stdClass();
  $block->module = 'os2web_kulturnaut_events';
  
  if (empty($term)) {
    return $block;
  }
  
  $field_settings = array(
    'label' => 'hidden',
    'type' => 'text_default',
  );

  if (!empty(field_get_items('taxonomy_term', $term, 'field_termtekst'))) {
    $block->content = field_view_field('taxonomy_term', $term, 'field_termtekst', $field_settings);
  }
  else {
    $block->content = field_view_field('taxonomy_term', $term, 'field_kulturnaut_desprition', $field_settings);
  }
  return $block;
}

function os2web_kulturnaut_events_location_description_content_type_admin_title($subtype, $conf, $context) {
  return t('"@s" term description', array('@s' => $context->identifier));
}

function os2web_kulturnaut_events_location_description_content_type_edit_form($form, &$form_state) {
  // Provide a blank form so we have a place to have context setting.
  return $form;
}
