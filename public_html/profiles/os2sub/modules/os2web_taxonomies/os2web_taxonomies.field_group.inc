<?php
/**
 * @file
 * os2web_taxonomies.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function os2web_taxonomies_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_banner|taxonomy_term|os2web_taxonomies_tax_places|form';
  $field_group->group_name = 'group_banner';
  $field_group->entity_type = 'taxonomy_term';
  $field_group->bundle = 'os2web_taxonomies_tax_places';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_content';
  $field_group->data = array(
    'label' => 'Banner',
    'weight' => '4',
    'children' => array(
      0 => 'field_os2web_base_field_banner',
      1 => 'field_banner_text',
      2 => 'field_banner_headline',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-banner field-group-htab',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $export['group_banner|taxonomy_term|os2web_taxonomies_tax_places|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_content|taxonomy_term|os2web_taxonomies_tax_places|form';
  $field_group->group_name = 'group_content';
  $field_group->entity_type = 'taxonomy_term';
  $field_group->bundle = 'os2web_taxonomies_tax_places';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Indhold',
    'weight' => '4',
    'children' => array(
      0 => 'group_banner',
      1 => 'group_gis',
      2 => 'group_tekst',
      3 => 'group_diverse',
    ),
    'format_type' => 'htabs',
    'format_settings' => array(
      'formatter' => '',
      'instance_settings' => array(
        'classes' => 'group-content field-group-htabs',
      ),
    ),
  );
  $export['group_content|taxonomy_term|os2web_taxonomies_tax_places|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_diverse|taxonomy_term|os2web_taxonomies_tax_places|form';
  $field_group->group_name = 'group_diverse';
  $field_group->entity_type = 'taxonomy_term';
  $field_group->bundle = 'os2web_taxonomies_tax_places';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_content';
  $field_group->data = array(
    'label' => 'Diverse',
    'weight' => '5',
    'children' => array(
      0 => 'field_os2web_kult_tema_feed_exc',
      1 => 'field_os2web_kulturnaut_tema',
      2 => 'field_os2web_base_field_promote',
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
  $export['group_diverse|taxonomy_term|os2web_taxonomies_tax_places|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_gis|taxonomy_term|os2web_taxonomies_tax_places|form';
  $field_group->group_name = 'group_gis';
  $field_group->entity_type = 'taxonomy_term';
  $field_group->bundle = 'os2web_taxonomies_tax_places';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_content';
  $field_group->data = array(
    'label' => 'GIS',
    'weight' => '6',
    'children' => array(
      0 => 'field_os2web_taxonomies_city',
      1 => 'field_os2web_taxonomies_name',
      2 => 'field_os2web_taxonomies_sys_id',
      3 => 'field_os2web_taxonomies_type',
      4 => 'field_os2web_taxonomies_maplink',
      5 => 'field_os2web_taxonomies_address',
      6 => 'field_os2web_taxonomies_website',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-gis field-group-htab',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $export['group_gis|taxonomy_term|os2web_taxonomies_tax_places|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_tekst|taxonomy_term|os2web_taxonomies_tax_places|form';
  $field_group->group_name = 'group_tekst';
  $field_group->entity_type = 'taxonomy_term';
  $field_group->bundle = 'os2web_taxonomies_tax_places';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_content';
  $field_group->data = array(
    'label' => 'Tekst og billede',
    'weight' => '3',
    'children' => array(
      0 => 'field_os2web_base_field_image',
      1 => 'field_os2web_taxonomies_disp_var',
      2 => 'description',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-tekst field-group-htab',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $export['group_tekst|taxonomy_term|os2web_taxonomies_tax_places|form'] = $field_group;

  return $export;
}
