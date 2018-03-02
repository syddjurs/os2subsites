<?php
/**
 * @file
 * os2web_kulturnaut_events.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function os2web_kulturnaut_events_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_billede|node|os2web_kulturnaut_knactivity|form';
  $field_group->group_name = 'group_billede';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'os2web_kulturnaut_knactivity';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_kulturnaut_knactivity';
  $field_group->data = array(
    'label' => 'Billede',
    'weight' => '29',
    'children' => array(
      0 => 'field_os2web_kulturnaut_slidesho',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-billede field-group-htab',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $export['group_billede|node|os2web_kulturnaut_knactivity|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_diverse|node|os2web_kulturnaut_knactivity|form';
  $field_group->group_name = 'group_diverse';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'os2web_kulturnaut_knactivity';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_kulturnaut_knactivity';
  $field_group->data = array(
    'label' => 'Diverse',
    'weight' => '30',
    'children' => array(
      0 => 'field_os2web_kulturnaut_genre',
      1 => 'field_os2web_kulturnaut_homepage',
      2 => 'field_os2web_kulturnaut_rel_acti',
      3 => 'field_os2web_kulturnaut_saddress',
      4 => 'field_os2web_kulturnaut_sarrang',
      5 => 'field_os2web_kulturnaut_scity',
      6 => 'field_os2web_kulturnaut_shomepag',
      7 => 'field_os2web_kulturnaut_sname',
      8 => 'field_os2web_kulturnaut_source',
      9 => 'field_os2web_kulturnaut_szip',
      10 => 'field_os2web_kulturnaut_time',
      11 => 'field_os2web_kulturnaut_url',
      12 => 'field_os2web_kulturnaut_event_id',
      13 => 'field_os2web_base_field_promote',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-diverse field-group-htab',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $export['group_diverse|node|os2web_kulturnaut_knactivity|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_kulturnaut_knactivity|node|os2web_kulturnaut_knactivity|form';
  $field_group->group_name = 'group_kulturnaut_knactivity';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'os2web_kulturnaut_knactivity';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Begivenhed',
    'weight' => '1',
    'children' => array(
      0 => 'group_tekst',
      1 => 'group_diverse',
      2 => 'group_billede',
    ),
    'format_type' => 'htabs',
    'format_settings' => array(
      'formatter' => '',
      'instance_settings' => array(
        'classes' => 'group-kulturnaut-knactivity field-group-htabs',
      ),
    ),
  );
  $export['group_kulturnaut_knactivity|node|os2web_kulturnaut_knactivity|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_tekst|node|os2web_kulturnaut_knactivity|form';
  $field_group->group_name = 'group_tekst';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'os2web_kulturnaut_knactivity';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_kulturnaut_knactivity';
  $field_group->data = array(
    'label' => 'Basis',
    'weight' => '28',
    'children' => array(
      0 => 'field_os2web_kulturnaut_date',
      1 => 'field_os2web_kulturnaut_descrip',
      2 => 'field_os2web_kulturnaut_longdesc',
      3 => 'field_os2web_kulturnaut_price',
      4 => 'field_os2web_kulturnaut_tema',
      5 => 'field_os2web_kulturnaut_venue',
      6 => 'field_os2web_base_field_edi_tags',
      7 => 'field_os2web_kulturnaut_target',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'label' => 'Basis',
      'instance_settings' => array(
        'required_fields' => 1,
        'id' => '',
        'classes' => 'group-tekst field-group-htab',
        'description' => '',
      ),
      'formatter' => 'closed',
    ),
  );
  $export['group_tekst|node|os2web_kulturnaut_knactivity|form'] = $field_group;

  return $export;
}
