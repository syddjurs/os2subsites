<?php
/**
 * @file
 * os2web_taxonomies.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function os2web_taxonomies_field_group_info() {
  $field_groups = array();

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
  $field_groups['group_banner|taxonomy_term|os2web_taxonomies_tax_places|form'] = $field_group;

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
      1 => 'group_diverse',
      2 => 'group_gis',
      3 => 'group_tekst',
    ),
    'format_type' => 'htabs',
    'format_settings' => array(
      'formatter' => '',
      'instance_settings' => array(
        'classes' => 'group-content field-group-htabs',
      ),
    ),
  );
  $field_groups['group_content|taxonomy_term|os2web_taxonomies_tax_places|form'] = $field_group;

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
  $field_groups['group_diverse|taxonomy_term|os2web_taxonomies_tax_places|form'] = $field_group;

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
      2 => 'field_os2web_taxonomies_type',
      3 => 'field_os2web_taxonomies_maplink',
      4 => 'field_os2web_taxonomies_address',
      5 => 'field_os2web_taxonomies_website',
      6 => 'field_os2web_taxonomies_sys_uid',
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
  $field_groups['group_gis|taxonomy_term|os2web_taxonomies_tax_places|form'] = $field_group;

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
      2 => 'field_termtekst',
      3 => 'field_kulturnaut_desprition',
      4 => 'description',
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
  $field_groups['group_tekst|taxonomy_term|os2web_taxonomies_tax_places|form'] = $field_group;

  // Translatables
  // Included for use with string extractors like potx.
  t('Banner');
  t('Diverse');
  t('GIS');
  t('Indhold');
  t('Tekst og billede');

  return $field_groups;
}
