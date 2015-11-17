<?php
/**
 * @file
 * os2sub_aktivitetskalender.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function os2sub_aktivitetskalender_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_dates|node|event_calendar|form';
  $field_group->group_name = 'group_dates';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'event_calendar';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_tabs';
  $field_group->data = array(
    'label' => 'Datoer',
    'weight' => '14',
    'children' => array(
      0 => 'event_calendar_date',
      1 => 'field_svarfrist',
      2 => 'field_synlig_fra',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-dates field-group-htab',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $export['group_dates|node|event_calendar|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_event_calendar_contact|node|event_calendar|form';
  $field_group->group_name = 'group_event_calendar_contact';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'event_calendar';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_tabs';
  $field_group->data = array(
    'label' => 'Kontakt',
    'weight' => '15',
    'children' => array(
      0 => 'field_event_calendar_addr',
      1 => 'field_event_calendar_by',
      2 => 'field_event_calendar_email',
      3 => 'field_event_calendar_field_org',
      4 => 'field_event_calendar_kontakt_per',
      5 => 'field_event_calendar_phone',
      6 => 'field_event_calendar_zip',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-event-calendar-contact field-group-htab',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $export['group_event_calendar_contact|node|event_calendar|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_tabs|node|event_calendar|form';
  $field_group->group_name = 'group_tabs';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'event_calendar';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Tabs',
    'weight' => '5',
    'children' => array(
      0 => 'group_event_calendar_contact',
      1 => 'group_dates',
    ),
    'format_type' => 'htabs',
    'format_settings' => array(
      'formatter' => '',
      'instance_settings' => array(
        'classes' => 'group-tabs field-group-htabs',
      ),
    ),
  );
  $export['group_tabs|node|event_calendar|form'] = $field_group;

  return $export;
}
